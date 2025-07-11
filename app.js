let currentSortField = null;
let ascending = true;

function sortBy(field) {
  if (currentSortField === field) {
    ascending = !ascending;
  } else {
    currentSortField = field;
    ascending = true;
  }

  employees.sort((a, b) => {
    const valA = a[field].toLowerCase();
    const valB = b[field].toLowerCase();
    return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  renderEmployees();
}

function renderEmployees() {
  const container = document.getElementById("employeeList");
  const limit = parseInt(document.getElementById("paginationLimit")?.value || 10);
  const searchTerm = document.getElementById("searchInput")?.value.toLowerCase() || "";
  container.innerHTML = "";

  const filtered = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(searchTerm) ||
    emp.lastName.toLowerCase().includes(searchTerm) ||
    emp.email.toLowerCase().includes(searchTerm)
  );

  const toShow = filtered.slice(0, limit);

  if (toShow.length === 0) {
    container.innerHTML = "<tr><td colspan='6'>No employees to show.</td></tr>";
    return;
  }

  toShow.forEach(emp => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.firstName}</td>
      <td>${emp.lastName}</td>
      <td>${emp.email}</td>
      <td>${emp.department}</td>
      <td>${emp.role}</td>
      <td>
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </td>
    `;
    container.appendChild(row);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("employeeId").value || Date.now();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value.trim();
  const role = document.getElementById("role").value.trim();
  const errorEl = document.getElementById("formError");

  if (!firstName || !lastName || !email || !department || !role) {
    errorEl.textContent = "Please fill all fields.";
    return;
  }

  const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailPattern.test(email)) {
    errorEl.textContent = "Invalid email format.";
    return;
  }

  const newEmp = { id: Number(id), firstName, lastName, email, department, role };
  const index = employees.findIndex(emp => emp.id === Number(id));
  if (index !== -1) {
    employees[index] = newEmp;
  } else {
    employees.push(newEmp);
  }

  alert("Employee saved!");
  window.location.href = "dashboard.html";
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  localStorage.setItem("editEmployee", JSON.stringify(emp));
  window.location.href = "form.html";
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    const index = employees.findIndex(e => e.id === id);
    if (index !== -1) {
      employees.splice(index, 1);
      renderEmployees();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("employeeForm")) {
    document.getElementById("employeeForm").addEventListener("submit", handleFormSubmit);
    const empData = localStorage.getItem("editEmployee");
    if (empData) {
      const emp = JSON.parse(empData);
      document.getElementById("formTitle").innerText = "Edit Employee";
      document.getElementById("employeeId").value = emp.id;
      document.getElementById("firstName").value = emp.firstName;
      document.getElementById("lastName").value = emp.lastName;
      document.getElementById("email").value = emp.email;
      document.getElementById("department").value = emp.department;
      document.getElementById("role").value = emp.role;
    }
  }

  if (document.getElementById("employeeList")) {
    document.getElementById("searchInput").addEventListener("input", renderEmployees);
    renderEmployees();
  }
});
