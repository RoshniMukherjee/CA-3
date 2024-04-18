document.addEventListener("DOMContentLoaded", function () {
    // Fetch random meal data
    fetchRandomMeal();

    // Event listener for search input
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const searchQuery = event.target.value.trim();
            if (searchQuery !== "") {
                fetchSearchedMeals(searchQuery);
            }
        }
    });
});

// Function to fetch random meal data
function fetchRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            const randomMeal = data.meals[0];
            displayRandomMeal(randomMeal);
        })
        .catch(error => console.error("Error fetching random meal:", error));
}

// Function to display random meal
function displayRandomMeal(meal) {
    const randomMealSection = document.getElementById("randomMeal");
    randomMealSection.innerHTML = `
        <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strMeal}</p>
        </div>
    `;

    // Event listener for random meal click to display ingredients modal
    randomMealSection.addEventListener("click", function () {
        displayIngredientsModal(meal.strMeal, meal.strInstructions);
    });
}

// Function to fetch searched meals by category
function fetchSearchedMeals(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
            const searchedMeals = data.meals;
            displaySearchedMeals(searchedMeals);
        })
        .catch(error => console.error("Error fetching searched meals:", error));
}

// Function to display searched meals
function displaySearchedMeals(meals) {
    const searchedMealsSection = document.getElementById("searchedMeals");
    searchedMealsSection.innerHTML = "";
    meals.forEach(meal => {
        searchedMealsSection.innerHTML += `
            <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strMeal}</p>
            </div>
        `;
    });
}

// Function to display ingredients modal
function displayIngredientsModal(mealName, ingredients) {
    const modal = document.getElementById("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${mealName}</h2>
            <h3>Ingredients:</h3>
            <p>${ingredients}</p>
        </div>
    `;

    // Show modal
    modal.style.display = "block";

    // Event listener to close modal
    const closeBtn = modal.querySelector(".close");
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}
