export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#343434",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(66, 153, 225, 0.5)" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#60a5fa" : "#4a5568",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#60a5fa" : "#1e293b",
    color: state.isSelected ? "#1e293b" : "#d1d5db",
    "&:hover": {
      backgroundColor: "#4a5568",
      color: "#d1d5db",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#d1d5db",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6b7280",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1e293b",
    borderRadius: "0.375rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  output: {
    backgroundColor: "#8e9eab", // Fallback color for old browsers
    backgroundImage: "linear-gradient(to right, #eef2f3, #8e9eab)",
    border: "1px solid #ccc",
    borderRadius: "0.375rem",
    padding: "1rem",
    marginTop: "1rem",
  },
};
