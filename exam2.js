const userForm = document.querySelector("#user-form");
const userCountInput = document.querySelector("#user-count");
const userList = document.querySelector("#user-list");
const message = document.querySelector("#message");

userForm.addEventListener("submit", getUsers);

async function getUsers(event) {
  event.preventDefault();

  const userCount = userCountInput.value;
  userList.innerHTML = "";
  message.textContent = "Loading users...";

  try {
    const response = await fetch(`https://randomuser.me/api/?results=${userCount}`);
    const data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
      const user = data.results[i];

      const column = document.createElement("div");
      column.className = "col-12 col-md-6 col-lg-4";

      const card = document.createElement("div");
      card.className = "card h-100 text-center";

      const picture = document.createElement("img");
      picture.src = user.picture.large;
      picture.alt = "User profile";
      picture.className = "rounded-circle w-25 mx-auto mt-3";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const name = document.createElement("h2");
      name.className = "card-title h5";
      name.textContent = user.name.first + " " + user.name.last;

      const email = document.createElement("p");
      email.className = "card-text";
      email.textContent = "Email: " + user.email;

      const location = document.createElement("p");
      location.className = "card-text";
      location.textContent = "Location: " + user.location.city + ", " + user.location.country;

      const phone = document.createElement("p");
      phone.className = "card-text";
      phone.textContent = "Phone: " + user.phone;

      cardBody.append(name, email, location, phone);
      card.append(picture, cardBody);
      column.appendChild(card);
      userList.appendChild(column);
    }

    message.textContent = "Users loaded successfully.";
  } catch (error) {
    message.textContent = "Could not load users. Please try again.";
    console.log(error);
  }
}
