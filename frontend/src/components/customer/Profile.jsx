function Profile() {
  const profile = {
    name: "Srija",
    email: "srija@email.com",
    phone: "9876543210",
    location: "Hyderabad",
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <p>
        <b>Name:</b> {profile.name}
      </p>
      <p>
        <b>Email:</b> {profile.email}
      </p>
      <p>
        <b>Phone:</b> {profile.phone}
      </p>
      <p>
        <b>Location:</b> {profile.location}
      </p>
    </div>
  );
}

export default Profile;
