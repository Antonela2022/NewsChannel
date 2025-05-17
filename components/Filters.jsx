const Filters = ({ type, setType }) => {
  return (
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="border px-3 py-2 rounded mb-6"
    >
      <option value="business">Business</option>
      <option value="entertainment">Entertainment</option>
      <option value="general">General</option>
      <option value="health">Health</option>
      <option value="science">Science</option>
      <option value="sports">Sports</option>
      <option value="technology">Technology</option>
    </select>
  );
};

export default Filters;
