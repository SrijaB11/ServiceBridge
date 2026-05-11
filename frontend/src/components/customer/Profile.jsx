import { useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Srija",
    email: "srija@email.com",
    phone: "9876543210",
    location: "Hyderabad",
    role: "Customer",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  });

  const [formData, setFormData] = useState(profile);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE PROFILE
  const handleUpdate = () => {
    setProfile(formData);
    setIsEditing(false);

    alert("Profile Updated Successfully");
  };

  // DELETE PROFILE
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete profile?",
    );

    if (confirmDelete) {
      setProfile(null);
    }
  };

  // EMPTY STATE
  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold text-red-500">Profile Deleted</h2>

        <button
          onClick={() =>
            setProfile({
              name: "Srija",
              email: "srija@email.com",
              phone: "9876543210",
              location: "Hyderabad",
              role: "Customer",
              image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            })
          }
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Restore Profile
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 mt-6">
      {/* PROFILE IMAGE */}
      <div className="flex flex-col items-center">
        <img
          src={profile.image}
          alt="profile"
          className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
        />

        {isEditing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-4 border rounded-lg px-3 py-2 w-full"
          />
        ) : (
          <h2 className="text-3xl font-bold mt-4 text-gray-800">
            {profile.name}
          </h2>
        )}

        <p className="text-gray-500 mt-1">{profile.role}</p>
      </div>

      {/* PROFILE DETAILS */}
      <div className="mt-8 space-y-5">
        {/* EMAIL */}
        <div>
          <label className="font-semibold text-gray-600">Email</label>

          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          ) : (
            <p className="text-gray-700">{profile.email}</p>
          )}
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
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          ) : (
            <p className="text-gray-700">{profile.phone}</p>
          )}
        </div>

        {/* LOCATION */}
        <div>
          <label className="font-semibold text-gray-600">Location</label>

          {isEditing ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          ) : (
            <p className="text-gray-700">{profile.location}</p>
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
          Delete
        </button>
      </div>
    </div>
  );
}

export default Profile;
