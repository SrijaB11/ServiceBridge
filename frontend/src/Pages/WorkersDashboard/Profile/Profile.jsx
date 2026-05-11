import { useEffect, useState } from "react";
import axios from "axios";
// import "./index.css";

const Profile = () => {
  const [workerDetails, setWorkerDetails] =
    useState(null);

  const [profilePhoto, setProfilePhoto] =
    useState(null);

  const [panCard, setPanCard] =
    useState(null);

  const [skillDoc, setSkillDoc] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // for fetching the worker detailss
  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/worker/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setWorkerDetails(response.data.data);

      } catch (error) {
        console.log(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to fetch profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerProfile();
  }, []);

  //for  Uploading  DOCUMENTS
  const handleUploadDocuments = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "profilePhoto",
        profilePhoto
      );

      formData.append(
        "panCard",
        panCard
      );

      formData.append(
        "skillDoc",
        skillDoc
      );

      const token =
        localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/worker/upload-documents",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);

      // refresh the profile after uploading 
      const updatedProfile = await axios.get(
        "http://localhost:5000/worker/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWorkerDetails(
        updatedProfile.data.data
      );

    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Upload failed"
      );
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="profile-main-container">

      <h1 className="profile-heading">
        Worker Profile
      </h1>

      {workerDetails && (
        <div className="profile-card">

          {/* PROFILE IMAGE */}
          <div className="profile-image-container">

            {workerDetails.documents
              ?.profilePhoto ? (
              <img
                src={`http://localhost:5000/${workerDetails.documents.profilePhoto}`}
                alt="profile"
                className="profile-image"
              />
            ) : (
              <img
                src="/images/default-profile.png"
                alt="default-profile"
                className="profile-image"
              />
            )}
          </div>

          {/* WORKER DETAILS */}
          <div className="worker-details">

            <p>
              <strong>Name:</strong>{" "}
              {workerDetails.fullName}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {workerDetails.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {workerDetails.phone}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {workerDetails.location}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {workerDetails.role}
            </p>

            <p>
              <strong>Verification:</strong>{" "}
              {workerDetails.isVerified
                ? "Verified"
                : "Pending"}
            </p>

            <p>
              <strong>Services:</strong>{" "}
              {workerDetails.services?.join(
                ", "
              )}
            </p>
          </div>
        </div>
      )}

      {/* UPLOAD DOCUMENTS */}
      <div className="upload-container">

        <h2>Upload Documents</h2>

        <form
          onSubmit={handleUploadDocuments}
          className="upload-form"
        >

          {/* PROFILE PHOTO */}
          <div className="input-group">

            <label>Profile Photo</label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) =>
                setProfilePhoto(
                  e.target.files[0]
                )
              }
            />
          </div>

          {/* PAN CARD */}
          <div className="input-group">

            <label>PAN Card</label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) =>
                setPanCard(
                  e.target.files[0]
                )
              }
            />
          </div>

          {/* SKILL DOCUMENT */}
          <div className="input-group">

            <label>Skill Document</label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) =>
                setSkillDoc(
                  e.target.files[0]
                )
              }
            />
          </div>

          <button
            type="submit"
            className="upload-button"
          >
            Upload Documents
          </button>
        </form>

        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Profile;