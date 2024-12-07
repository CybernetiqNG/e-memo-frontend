import React, { useEffect, useState } from "react";

const MobileWarning = ({ children }) => {
  const [isBlocked, setIsBlocked] = useState(false);

  // Function to check if the user is on a restricted mobile device
  const checkDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isSmallMobile =
      /Mobi|Android|iPhone/i.test(userAgent) && window.innerWidth < 768;
    const isTablet =
      /iPad|Tablet|SM-T|GT-N|Pixel C|Nexus 7|Nexus 9/i.test(userAgent) ||
      (window.innerWidth >= 768 && window.innerWidth <= 1024);

    // Block only if it's a small mobile device (not a tablet)
    setIsBlocked(isSmallMobile && !isTablet);
  };

  useEffect(() => {
    // Initial check
    checkDevice();

    // Update check on window resize
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // If it's a restricted mobile device, show the warning message
  if (isBlocked) {
    return (
      <div style={styles.warning}>
        <h2>Access Restricted</h2>
        <p>
          This section is only accessible on laptops, desktops, or larger
          tablets. Please use a larger screen.
        </p>
      </div>
    );
  }

  // Otherwise, render the main app content
  return <>{children}</>;
};

const styles = {
  warning: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    color: "#d9534f",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
};

export default MobileWarning;
