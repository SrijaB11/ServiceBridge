import { useEffect, useState } from "react";
import axios from "axios";

function WorkerProfile() {
  const [workerDetails, setWorkerDetails] =
    useState(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [formData, setFormData] =
    useState({
      phone: "",
      services: "",
    });

  const [profilePhoto, setProfilePhoto] =
    useState(null);

  const [panCard, setPanCard] =
    useState(null);

  const [skillDocs, setSkillDocs] =
  useState(null);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  useEffect(() => {
    fetchWorkerProfile();
  }, []);

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

      setWorkerDetails(
        response.data.data
      );

      setFormData({
        phone:
          response.data.data.phone || "",
        services:
          response.data.data.services?.join(
            ", "
          ) || "",
      });
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const phoneRegex =
        /^[6-9]\d{9}$/;

      if (
        !phoneRegex.test(formData.phone)
      ) {
        alert(
          "Enter valid 10 digit mobile number"
        );

        return;
      }

      const token =
        localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/worker/update-profile",
        {
          phone: formData.phone,
          services: formData.services
            .split(",")
            .map((service) =>
              service.trim()
            ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Profile Updated Successfully"
      );

      await fetchWorkerProfile();

      setIsEditing(false);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Update Failed"
      );
    }
  };

      const documentsUploaded =
      workerDetails?.documents
        ?.profilePhoto ||
      workerDetails?.documents
        ?.panCard ||
      workerDetails?.documents
        ?.skillDocs;

  const handleUploadDocuments = async (
    e
  ) => {
    e.preventDefault();

    try {
      if (
            !profilePhoto ||
            !panCard ||
            !skillDocs
          ){
        setMessage(
          "Please upload all documents"
        );

        return;
      }

      setUploading(true);

      const formDataObj =
        new FormData();

      formDataObj.append(
        "profilePhoto",
        profilePhoto
      );

      formDataObj.append(
        "panCard",
        panCard
      );

      formDataObj.append(
              "skillDocs",
              skillDocs
            );

      const token =
        localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/worker/upload-documents",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);

      await fetchWorkerProfile();

    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl font-semibold text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 mt-6">

      {/* PROFILE HEADER */}
      <div className="flex flex-col items-center">

        <img
          src={
            workerDetails?.documents
              ?.profilePhoto
              ? `http://localhost:5000/${workerDetails?.documents?.profilePhoto}`
              : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profile"
          className="w-32 h-32 rounded-full border-4 border-green-500 object-cover"
        />

        <h2 className="text-3xl font-bold mt-4 text-gray-800">
          {workerDetails?.fullName}
        </h2>

        <p className="text-gray-500 mt-1 capitalize">
          {workerDetails?.role}
        </p>

        <div
          className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold
          ${
            workerDetails?.isVerified
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {workerDetails?.isVerified
            ? "Verified Account"
            : "Not Verified"}
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* EMAIL */}
        <div>
          <label className="font-semibold text-gray-600">
            Email
          </label>

          <div className="w-full mt-2 border rounded-xl px-4 py-3 bg-gray-50">
            {workerDetails?.email}
          </div>
        </div>

        {/* PHONE */}
        <div>
          <label className="font-semibold text-gray-600">
            Phone
          </label>

          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3"
            />
          ) : (
            <div className="w-full mt-2 border rounded-xl px-4 py-3 bg-gray-50">
              {workerDetails?.phone}
            </div>
          )}
        </div>

        {/* LOCATION */}
        <div>
          <label className="font-semibold text-gray-600">
            Location
          </label>

          <div className="w-full mt-2 border rounded-xl px-4 py-3 bg-gray-50">
            {workerDetails?.location}
          </div>
        </div>

        {/* ROLE */}
        <div>
          <label className="font-semibold text-gray-600">
            Role
          </label>

          <div className="w-full mt-2 border rounded-xl px-4 py-3 bg-gray-50 capitalize">
            {workerDetails?.role}
          </div>
        </div>

        {/* PROFESSIONAL STATUS */}
        <div>
          <label className="font-semibold text-gray-600">
            Professional Verification
          </label>

          <div
                className={`w-full mt-2 border rounded-xl px-4 py-3 font-semibold capitalize
                ${
                  workerDetails?.workerVerificationStatus ===
                  "approved"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : workerDetails?.workerVerificationStatus ===
                      "rejected"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                }`}
              >
                {
                  workerDetails?.workerVerificationStatus
                }
              </div>
        </div>

        {/* SERVICES */}
        <div>
          <label className="font-semibold text-gray-600">
            Services
          </label>

          {isEditing ? (
            <input
              type="text"
              name="services"
              value={formData.services}
              onChange={handleChange}
              placeholder="Electrician, Plumbing"
              className="w-full mt-2 border rounded-xl px-4 py-3"
            />
          ) : (
            <div className="w-full mt-2 border rounded-xl px-4 py-3 bg-gray-50">
              {workerDetails?.services?.join(
                ", "
              )}
            </div>
          )}
        </div>
      </div>

      {/* EDIT BUTTON */}
      <div className="flex gap-4 mt-8">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() =>
              setIsEditing(true)
            }
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* DOCUMENTS */}
      {documentsUploaded && (
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Uploaded Documents
          </h2>

          {/* PAN CARD */}
          {workerDetails?.documents
            ?.panCard && (
            <div className="mb-3">
              <a
                href={`http://localhost:5000/${workerDetails?.documents?.panCard}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PAN Card
              </a>
            </div>
          )}

          {/* SKILL DOCS */}
          {workerDetails?.documents
            ?.skillDocs && (
                  <a
                    href={`http://localhost:5000/${workerDetails.documents.skillDocs}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Skill Document
                  </a>
              
            )}

          <p className="mt-4 text-orange-600 font-semibold">
          </p>
        </div>
      )}

      {/* UPLOAD FORM */}
      {!documentsUploaded && (
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5 text-gray-800">
            Upload Documents
          </h2>

          <form
            onSubmit={
              handleUploadDocuments
            }
            className="space-y-5"
          >

            <div>
              <label className="font-semibold text-gray-700">
                Profile Photo
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  setProfilePhoto(
                    e.target.files[0]
                  )
                }
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
                <p className="text-sm text-gray-500 mt-2">
                       Allowed: JPG, JPEG, PNG • Max size: 2MB  
                </p>  
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                PAN Card
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) =>
                  setPanCard(
                    e.target.files[0]
                  )
                }
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
              <p className="text-sm text-gray-500 mt-2">
                       Allowed: JPG, JPEG, PNG, PDF • Max size: 5MB
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Skill Document
              </label>

              <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) =>
                      setSkillDocs(
                        e.target.files[0]
                      )
                    }
                    className="w-full mt-2 border rounded-xl px-4 py-3"
                  />

                  <p className="text-sm text-gray-500 mt-2">
                    Allowed: JPG, JPEG, PNG, PDF • Max size: 5MB • Only 1 document allowed
                  </p>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
            >
              {uploading
                ? "Uploading..."
                : "Upload Documents"}
            </button>
          </form>

          <p className="mt-4 text-red-500 font-medium">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
export default WorkerProfile;