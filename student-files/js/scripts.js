async function getStudentData() {
  const response = await fetch('https://randomuser.me/api/?results=12');
  const data = await response.json();
  console.log(data);
  return data;
}

getStudentData();