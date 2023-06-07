$(document).ready(() => {
	// Function to fetch cupcakes from the API and update the cupcake list
	const fetchCupcakes = () => {
		axios
			.get("/api/cupcakes")
			.then((response) => {
				const cupcakes = response.data.cupcakes;
				const cupcakeList = $("#cupcake-list");
				cupcakeList.empty();

				if (cupcakes.length === 0) {
					cupcakeList.append(
						'<li class="list-group-item">No cupcakes available.</li>'
					);
				} else {
					cupcakes.forEach((cupcake) => {
						const listItem = `<li class="list-group-item">
				<div class="row">
				<div class="col-2">
					<img src="${cupcake.image}" alt="Cupcake Image" class="img-fluid">
				</div>
				<div class="col-8">
					<strong>${cupcake.flavor}</strong> -
					Size: ${cupcake.size}, Rating: ${cupcake.rating}
				</div>
				<div class="col-2">
					<button class="btn btn-danger btn-sm delete-cupcake" data-cupcake-id="${cupcake.id}">Delete</button>
				</div>
				</div>
				</li>`;
						cupcakeList.append(listItem);
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// Event listener for form submission
	$("#cupcake-form").submit((event) => {
		event.preventDefault();
		const flavor = $("#flavor").val();
		const size = $("#size").val();
		const rating = parseFloat($("#rating").val());
		const image = $("#image").val();

		const newCupcake = {
			flavor,
			size,
			rating,
		};
		if (image) {
			newCupcake.image = image;
		}

		axios
			.post("/api/cupcakes", newCupcake)
			.then((response) => {
				console.log("Cupcake added:", response.data.cupcake);
				fetchCupcakes(); // Refresh the cupcake list after successful submission
				$("#flavor").val("");
				$("#size").val("");
				$("#rating").val("");
				$("#image").val("");
			})
			.catch((error) => {
				console.error(error);
			});
	});

	// Event listener for deleting a cupcake
	$("#cupcake-list").on("click", ".delete-cupcake", (event) => {
		const cupcakeId = $(event.currentTarget).data("cupcake-id");

		// Show confirmation message before deleting the cupcake
		if (confirm("Are you sure you want to delete this cupcake?")) {
			axios
				.delete(`/api/cupcakes/${cupcakeId}`)
				.then((response) => {
					console.log("Cupcake deleted:", response.data.message);
					fetchCupcakes(); // Refresh the cupcake list after successful deletion
				})
				.catch((error) => {
					console.error(error);
				});
		}
	});

	// Initial fetch of cupcakes when the page loads
	fetchCupcakes();
});
