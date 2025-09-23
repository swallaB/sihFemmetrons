# from flask import Flask, request, jsonify
# import pickle
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.neighbors import NearestNeighbors
# import os

# app = Flask(__name__)

# MODEL_PATH = "recommender.pkl"
# DATA_PATH = "internship.csv"

# # -------------------- Training / Loading Model -------------------- #
# def train_and_save_model(csv_path, pkl_path):
#     df = pd.read_csv(csv_path)

#     text_cols = [
#         "Internship_Title", "Company_Name", "Sector", "Area_Field",
#         "Internship_State", "Internship_District", "Required_Skills",
#         "Company_Description", "Eligibility_Description", "Benefits"
#     ]
#     text_cols = [c for c in text_cols if c in df.columns]
#     df[text_cols] = df[text_cols].fillna("")
#     df["combined_text"] = df[text_cols].agg(" ".join, axis=1)

#     vectorizer = TfidfVectorizer(max_features=20000, stop_words="english", ngram_range=(1, 2))
#     X = vectorizer.fit_transform(df["combined_text"])

#     nn = NearestNeighbors(n_neighbors=10, metric="cosine", algorithm="brute")
#     nn.fit(X)

#     pipeline = {
#         "vectorizer": vectorizer,
#         "nn_model": nn,
#         "dataframe": df.reset_index(drop=True),
#         "tfidf_matrix": X
#     }
#     with open(pkl_path, "wb") as f:
#         pickle.dump(pipeline, f)
#     return pipeline


# # Load or train model
# if os.path.exists(MODEL_PATH):
#     with open(MODEL_PATH, "rb") as f:
#         pipeline = pickle.load(f)
# else:
#     pipeline = train_and_save_model(DATA_PATH, MODEL_PATH)

# vectorizer = pipeline["vectorizer"]
# nn = pipeline["nn_model"]
# df = pipeline["dataframe"]
# tfidf_matrix = pipeline["tfidf_matrix"]

# # -------------------- Helper Functions -------------------- #
# def build_candidate_query(profile):
#     query_parts = [
#         profile.get("Education", ""),
#         profile.get("Skills", ""),
#         profile.get("Sector", "")
#     ]
#     if profile.get("Location"):
#         query_parts.append(profile["Location"])
#     if profile.get("Duration"):
#         query_parts.append(profile["Duration"])
#     if profile.get("Mode"):
#         query_parts.append(profile["Mode"])
#     return " ".join(query_parts)


# def update_model_with_new_internship(new_entry):
#     global df, vectorizer, nn, tfidf_matrix
#     # Append to dataframe
#     df = pd.concat([df, pd.DataFrame([new_entry])], ignore_index=True)

#     # Update combined_text
#     text_cols = [
#         "Internship_Title", "Company_Name", "Sector", "Area_Field",
#         "Internship_State", "Internship_District", "Required_Skills",
#         "Company_Description", "Eligibility_Description", "Benefits"
#     ]
#     text_cols = [c for c in text_cols if c in df.columns]
#     df[text_cols] = df[text_cols].fillna("")
#     df["combined_text"] = df[text_cols].agg(" ".join, axis=1)

#     # Update TF-IDF matrix
#     tfidf_matrix = vectorizer.fit_transform(df["combined_text"])
#     nn.fit(tfidf_matrix)

#     # Save updated pipeline
#     pipeline = {
#         "vectorizer": vectorizer,
#         "nn_model": nn,
#         "dataframe": df.reset_index(drop=True),
#         "tfidf_matrix": tfidf_matrix
#     }
#     with open(MODEL_PATH, "wb") as f:
#         pickle.dump(pipeline, f)

#     # Save updated CSV
#     df.to_csv(DATA_PATH, index=False)


# # -------------------- Routes -------------------- #
# @app.route("/")
# def home():
#     return {"message": "Internship Recommender API is running ✅"}


# # Search-based recommendation
# @app.route("/recommend", methods=["POST"])
# def recommend_search():
#     data = request.get_json()
#     query = data.get("query", "")
#     top_k = int(data.get("top_k", 5))

#     if not query.strip():
#         return jsonify({"error": "Query cannot be empty"}), 400

#     vec = vectorizer.transform([query])
#     distances, indices = nn.kneighbors(vec, n_neighbors=top_k)
#     results = df.iloc[indices[0]].copy()
#     results["score"] = 1 - distances[0]

#     output = results[[
#         "Internship_ID", "Company_Name", "Internship_Title",
#         "Internship_State", "Internship_District", "Required_Skills", "score"
#     ]].to_dict(orient="records")

#     return jsonify({"query": query, "recommendations": output})


# # Candidate profile-based recommendation
# @app.route("/recommend_candidate", methods=["POST"])
# def recommend_candidate():
#     data = request.get_json()
#     profile = data.get("profile", {})
#     top_k = int(data.get("top_k", 5))

#     if not profile:
#         return jsonify({"error": "Profile cannot be empty"}), 400

#     query_text = build_candidate_query(profile)

#     # Filtering
#     filtered_df = df.copy()
#     if profile.get("Location") and "Internship_State" in filtered_df.columns:
#         filtered_df = filtered_df[
#             filtered_df["Internship_State"].str.contains(profile["Location"], case=False, na=False)
#         ]
#     if profile.get("Duration") and "Duration" in filtered_df.columns:
#         filtered_df = filtered_df[
#             filtered_df["Duration"].str.contains(profile["Duration"], case=False, na=False)
#         ]
#     if profile.get("Mode") and "Mode" in filtered_df.columns:
#         filtered_df = filtered_df[
#             filtered_df["Mode"].str.contains(profile["Mode"], case=False, na=False)
#         ]

#     if filtered_df.empty:
#         return jsonify({"message": "No internships match the given profile"}), 200

#     # Recompute TF-IDF for filtered data
#     text_cols = [
#         "Internship_Title", "Company_Name", "Sector", "Area_Field",
#         "Internship_State", "Internship_District", "Required_Skills",
#         "Company_Description", "Eligibility_Description", "Benefits"
#     ]
#     text_cols = [c for c in text_cols if c in filtered_df.columns]
#     filtered_df[text_cols] = filtered_df[text_cols].fillna("")
#     filtered_df["combined_text"] = filtered_df[text_cols].agg(" ".join, axis=1)
#     filtered_tfidf = vectorizer.transform(filtered_df["combined_text"])

#     # Train temporary NearestNeighbors on filtered data
#     temp_nn = NearestNeighbors(n_neighbors=min(top_k, len(filtered_df)), metric="cosine", algorithm="brute")
#     temp_nn.fit(filtered_tfidf)

#     # Query
#     vec = vectorizer.transform([query_text])
#     distances, indices = temp_nn.kneighbors(vec, n_neighbors=min(top_k, len(filtered_df)))

#     results = filtered_df.iloc[indices[0]].copy()
#     results["score"] = 1 - distances[0]

#     output = results[[
#         "Internship_ID", "Company_Name", "Internship_Title",
#         "Internship_State", "Internship_District", "Required_Skills", "score"
#     ]].to_dict(orient="records")

#     return jsonify({"profile": profile, "recommendations": output})


# # Add a new internship dynamically
# @app.route("/add_internship", methods=["POST"])
# def add_internship():
#     data = request.get_json()
#     if not data:
#         return jsonify({"error": "Internship data cannot be empty"}), 400
#     try:
#         update_model_with_new_internship(data)
#         return jsonify({"message": "✅ Internship added and model updated dynamically."})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # Refresh / retrain model
# @app.route("/refresh", methods=["POST"])
# def refresh():
#     global vectorizer, nn, df, tfidf_matrix
#     try:
#         pipeline = train_and_save_model(DATA_PATH, MODEL_PATH)
#         vectorizer = pipeline["vectorizer"]
#         nn = pipeline["nn_model"]
#         df = pipeline["dataframe"]
#         tfidf_matrix = pipeline["tfidf_matrix"]
#         return {"message": "✅ Model refreshed successfully with latest internships."}
#     except Exception as e:
#         return {"error": str(e)}, 500


# # -------------------- Run Server -------------------- #
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)
from flask import Flask, request, jsonify
import pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import os

app = Flask(__name__)

MODEL_PATH = "recommender.pkl"
DATA_PATH = "internships.csv"


# -------------------- Training / Loading Model -------------------- #
def train_and_save_model(csv_path, pkl_path):
    df = pd.read_csv(csv_path)

    primary_cols = [
        "Internship_Title", "Company_Name", "Sector", "Area_Field",
        "Required_Skills", "Eligibility_Education", "Benefits", "Company_Description"
    ]
    primary_cols = [c for c in primary_cols if c in df.columns]
    df[primary_cols] = df[primary_cols].fillna("")
    df["combined_text"] = df[primary_cols].agg(" ".join, axis=1)

    vectorizer = TfidfVectorizer(max_features=20000, stop_words="english", ngram_range=(1, 2))
    X = vectorizer.fit_transform(df["combined_text"])

    nn = NearestNeighbors(n_neighbors=10, metric="cosine", algorithm="brute")
    nn.fit(X)

    pipeline = {
        "vectorizer": vectorizer,
        "nn_model": nn,
        "dataframe": df.reset_index(drop=True),
        "tfidf_matrix": X
    }
    with open(pkl_path, "wb") as f:
        pickle.dump(pipeline, f)
    return pipeline


# Load or train model
if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, "rb") as f:
        pipeline = pickle.load(f)
else:
    pipeline = train_and_save_model(DATA_PATH, MODEL_PATH)

vectorizer = pipeline["vectorizer"]
nn = pipeline["nn_model"]
df = pipeline["dataframe"]
tfidf_matrix = pipeline["tfidf_matrix"]


# -------------------- Helper Functions -------------------- #
def build_candidate_query(profile):
    query_parts = [
        profile.get("Education", ""),
        profile.get("Skills", ""),
        profile.get("Sector", "")
    ]
    return " ".join(query_parts)


def update_model_with_new_internship(new_entry):
    global df, vectorizer, nn, tfidf_matrix
    df = pd.concat([df, pd.DataFrame([new_entry])], ignore_index=True)

    primary_cols = [
        "Internship_Title", "Company_Name", "Sector", "Area_Field",
        "Required_Skills", "Eligibility_Education", "Benefits", "Company_Description"
    ]
    primary_cols = [c for c in primary_cols if c in df.columns]
    df[primary_cols] = df[primary_cols].fillna("")
    df["combined_text"] = df[primary_cols].agg(" ".join, axis=1)

    tfidf_matrix = vectorizer.fit_transform(df["combined_text"])
    nn.fit(tfidf_matrix)

    pipeline = {
        "vectorizer": vectorizer,
        "nn_model": nn,
        "dataframe": df.reset_index(drop=True),
        "tfidf_matrix": tfidf_matrix
    }
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(pipeline, f)

    df.to_csv(DATA_PATH, index=False)


# -------------------- Routes -------------------- #
@app.route("/")
def home():
    return {"message": "Internship Recommender API is running ✅"}


# Candidate profile-based recommendation
@app.route("/recommend_candidate", methods=["POST"])
def recommend_candidate():
    data = request.get_json()
    profile = data.get("profile", {})
    top_k = int(data.get("top_k", 5))

    if not profile:
        return jsonify({"error": "Profile cannot be empty"}), 400

    query_text = build_candidate_query(profile)

    # Secondary filters
    filtered_df = df.copy()
    if profile.get("Location") and "Internship_State" in filtered_df.columns:
        filtered_df = filtered_df[
            filtered_df["Internship_State"].str.contains(profile["Location"].strip(), case=False, na=False)
        ]

    if profile.get("Duration") and "Duration_Months" in filtered_df.columns:
        try:
            duration_num = int(profile["Duration"].split()[0])
            filtered_df = filtered_df[filtered_df["Duration_Months"] == duration_num]
        except:
            pass

    if profile.get("Mode") and "Mode" in filtered_df.columns:
        filtered_df = filtered_df[
            filtered_df["Mode"].str.contains(profile["Mode"].strip(), case=False, na=False)
        ]

    if filtered_df.empty:
        return jsonify({"message": "No internships match the given profile"}), 200

    # TF-IDF for primary importance
    primary_cols = [
        "Internship_Title", "Company_Name", "Sector", "Area_Field",
        "Required_Skills", "Eligibility_Education", "Benefits", "Company_Description"
    ]
    primary_cols = [c for c in primary_cols if c in filtered_df.columns]
    filtered_df[primary_cols] = filtered_df[primary_cols].fillna("")
    filtered_df["combined_text"] = filtered_df[primary_cols].agg(" ".join, axis=1)
    filtered_tfidf = vectorizer.transform(filtered_df["combined_text"])

    temp_nn = NearestNeighbors(n_neighbors=min(top_k, len(filtered_df)), metric="cosine", algorithm="brute")
    temp_nn.fit(filtered_tfidf)

    vec = vectorizer.transform([query_text])
    distances, indices = temp_nn.kneighbors(vec, n_neighbors=min(top_k, len(filtered_df)))

    results = filtered_df.iloc[indices[0]].copy()

    # Convert results to strict schema format
    schema_cols = [
        "Company_Name", "Sector", "Area_Field", "Internship_Title",
        "Internship_State", "Internship_District", "Benefits", "Mode",
        "Duration_Months", "Stipend_Amount", "Required_Skills", "Application_Deadline",
        "Company_Description", "Stipend_Type", "Requirement_Contact",
        "Eligibility_Education", "Eligibility_Experience", "Eligibility_Description",
        "Hiring_Workflow"
    ]

    output = []
    for _, row in results.iterrows():
        internship = {}
        for col in schema_cols:
            if col in row:
                internship[col] = row[col]
            else:
                internship[col] = None
        # Ensure Required_Skills is a list
        if internship.get("Required_Skills") and not isinstance(internship["Required_Skills"], list):
            internship["Required_Skills"] = [s.strip() for s in str(internship["Required_Skills"]).split(",")]
        output.append(internship)

    return jsonify({"profile": profile, "recommendations": output})


# Add new internship dynamically
@app.route("/add_internship", methods=["POST"])
def add_internship():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Internship data cannot be empty"}), 400
    try:
        update_model_with_new_internship(data)
        return jsonify({"message": "✅ Internship added and model updated dynamically."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Refresh / retrain model
@app.route("/refresh", methods=["POST"])
def refresh():
    global vectorizer, nn, df, tfidf_matrix
    try:
        pipeline = train_and_save_model(DATA_PATH, MODEL_PATH)
        vectorizer = pipeline["vectorizer"]
        nn = pipeline["nn_model"]
        df = pipeline["dataframe"]
        tfidf_matrix = pipeline["tfidf_matrix"]
        return {"message": "✅ Model refreshed successfully with latest internships."}
    except Exception as e:
        return {"error": str(e)}, 500


# -------------------- Run Server -------------------- #
if __name__ == "__main__":
    app.run(debug=True, port=5000)

