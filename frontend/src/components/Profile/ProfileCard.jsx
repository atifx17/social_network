import { Link } from "react-router-dom";
import userImage from "../../assets/userImage.png"; 

export default function ProfileCard({ user }) {
  function calculateAge(dob) {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
  }

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl w-full h-fit">
      
      <div className="flex flex-col items-center">
        
        <div className="relative">
          <img
            src={user.profile_pic ? `http://127.0.0.1:8000${user.profile_pic}` : userImage}
            className="w-28 h-28 rounded-full object-cover border"
            alt="profile"
          />

          <Link to="/update-profile">
            <span className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer">
              ✏
            </span>
          </Link>
        </div>

        <h2 className="text-xl font-bold mt-3">{user.full_name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">DOB: {user.date_of_birth}</p>
        <p className="text-gray-600">Age: {calculateAge(user.date_of_birth)}</p>
        <p className="text-blue-600 text-sm mt-3 cursor-pointer">
          Share Profile
        </p>
      </div>

    </div>
  );
}
