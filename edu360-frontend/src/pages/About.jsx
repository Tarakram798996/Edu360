import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-md bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">About RVR JC Edu360</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Welcome to Edu360, a comprehensive web application designed for RVR & JC College of Engineering. This platform streamlines communication and activity management between students, teachers, and administrators.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        The application serves as a central hub where students can upload certificates and academic activities for validation, while teachers can easily approve or reject them. Additionally, both teachers and admins can post important announcements and events, ensuring that information reaches the right audience.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        Our goal is to foster a more connected and organized academic environment, making it easier for everyone to manage their responsibilities and stay informed.
      </p>
    </div>
  );
};

export default About;