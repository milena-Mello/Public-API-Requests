async function getStudentData() {
  const response = await fetch('https://randomuser.me/api/?results=10');
  const data = await response.json();
  console.log(data.results);
  return data.results;
}