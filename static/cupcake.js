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
                <div class="col-10">
                    <strong>${cupcake.flavor}</strong> -
                    Size: ${cupcake.size}, Rating: ${cupcake.rating}
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
				// Clear the form inputs
				$("#flavor").val("");
				$("#size").val("");
				$("#rating").val("");
				$("#image").val("");
			})
			.catch((error) => {
				console.error(error);
			});
	});

	// Initial fetch of cupcakes when the page loads
	fetchCupcakes();
});
