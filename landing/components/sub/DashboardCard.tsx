"use client";
import React, { useEffect, useState } from 'react'

const DashboardCard = () => {
  const [countUserRole, setCountUserRole] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/users")
      .then(response => response.json())
      .then(data => {
        const usersWithRole3 = data.data.filter(user => {
          return user.role === "3" || user.role === 3;
        });

        const countUsers = usersWithRole3.length;
        setCountUserRole(countUsers);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  return (
    <p>{countUserRole}</p>
  );
};

export default DashboardCard