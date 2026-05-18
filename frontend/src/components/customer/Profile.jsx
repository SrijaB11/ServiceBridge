import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});

  // FETCH PROFILE
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/customer/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const customer = res.data.customer;

      setProfile(customer);

      setFormData({
        fullName: customer.fullName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        location: customer.location || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE PROFILE
  // const handleUpdate = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const res = await axios.put(
  //       "http://localhost:5000/customer/update",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     setProfile(res.data.customer);

  //     setIsEditing(false);

  //     alert("Profile Updated Successfully");
  //   } catch (error) {
  //     console.log(error);

  //     alert(error.response?.data?.message || "Update Failed");
  //   }
  // };

  const handleUpdate = async () => {
    try {
      const phoneRegex = /^[6-9]\d{9}$/;
      const nameRegex = /^[A-Za-z ]+$/;

      if (!formData.fullName || formData.fullName.trim() === "") {
        alert("Name is required");
        return;
      }

      if (!nameRegex.test(formData.fullName.trim())) {
        alert("Name should contain only letters");
        return;
      }

      if (!formData.phone) {
        alert("Mobile number is required");
        return;
      }

      if (!phoneRegex.test(formData.phone)) {
        alert("Enter valid 10 digit mobile number");
        return;
      }

      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/customer/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProfile(res.data.customer);

      setIsEditing(false);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Update Failed");
    }
  };
  // DELETE PROFILE
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure want to delete account?",
      );

      if (!confirmDelete) return;

      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:5000/customer/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.clear();

      setProfile(null);

      alert("Account Deleted Successfully");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  // LOADING
  if (!profile) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 mt-6">
      {/* PROFILE HEADER */}
      <div className="flex flex-col items-center">
        <img
          src={
            profile.documents?.profilePhoto ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profile"
          className="w-28 h-28 rounded-full border-4 border-green-500 object-cover"
        />

        {isEditing ? (
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-4 border rounded-lg px-4 py-2 w-full"
          />
        ) : (
          <h2 className="text-3xl font-bold mt-4 text-gray-800">
            {profile.fullName}
          </h2>
        )}

        <p className="text-gray-500 mt-1 capitalize">{profile.role}</p>

        <div
          className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold
          ${
            profile.isVerified
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {profile.isVerified ? "Verified Account" : "Not Verified"}
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* EMAIL */}
        <div>
          <label className="font-semibold text-gray-600">Email</label>

          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full mt-2 border rounded-xl px-4 py-3 bg-gray-100"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="font-semibold text-gray-600">Phone</label>

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
              {profile.phone}
            </div>
          )}
        </div>

        {/* LOCATION */}
        <div className="sm:col-span-2">
          <label className="font-semibold text-gray-600">Location</label>

          {isEditing ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3"
            />
          ) : (
            <div className="w-full mt-2 border rounded-xl px-4 py-3 bg-gray-50">
              {profile.location}
            </div>
          )}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Edit Profile
          </button>
        )}

        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Profile;
