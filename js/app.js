window.addEventListener("DOMContentLoaded", () => {
	const wrapper = document.querySelector(".main-wrapper");
	const modalWrapper = document.querySelector(".modal__wrapper");
	const modalContent = document.querySelector(".modal__content");
	const modalContent2 = document.querySelector(".modal__content2");
	const first = document.querySelector(".game__decor--first");
	const last = document.querySelector(".game__decor--last");
	const tryFirst = document.querySelector(".try__first");
	const trySecond = document.querySelector(".try__second");

	const modalBotton = document.getElementById("go-to-slot");
	const btnLast = document.getElementById("go-to-forma");

	const slotsContainer = document.getElementById("slots-container");
	const slot8 = document.querySelector('[data-order="8"]');
	const slot14 = document.querySelector('[data-order="14"]');
	const item8 = document.querySelector(".item8");
	const item14 = document.querySelector(".item14");

	/*** Sound ***/
	const mainSound = document.querySelector(".main_sound");
	const winFirst = document.querySelector(".win_first");
	const winLast = document.querySelector(".win_last");
	const clickSound = document.querySelector(".click_sound");

	winFirst.volume = 0.3;
	winLast.volume = 0.3;

	// mainSound.play();

	new Sortable(slotsContainer, {
		swap: true,
		swapClass: "slot__item",
		animation: 150,
		swapThreshold: 1,
		onMove: function (evt) {
			// mainSound.play();
			const draggedOrder = evt.dragged.getAttribute("data-order");
			const relatedOrder = evt.related.getAttribute("data-order");

			if (
				(draggedOrder === "8" && relatedOrder === "14") ||
				(draggedOrder === "14" && relatedOrder === "8")
			) {
				return true;
			}
			return false;
		},
		onEnd: function (evt) {
			const slot8 = document.querySelector('[data-order="8"]');
			const slot14 = document.querySelector('[data-order="14"]');

			if (!slot8.classList.contains("slot__item")) {
				slot8.classList.add("slot__item");
				slot8.classList.add("active");
			}

			if (!slot14.classList.contains("slot__item")) {
				slot14.classList.add("slot__item");
				slot14.classList.add("active");
			}

			const oldIndex = evt.oldIndex;
			const newIndex = evt.newIndex;

			if (
				(oldIndex === 8 && newIndex === 14) ||
				(oldIndex === 14 && newIndex === 8)
			) {
				winGame();
			}

			// winGame();
		},
		filter: function (evt, target) {
			return (
				!target.classList.contains("slot__item") ||
				(target.getAttribute("data-order") !== "8" &&
					target.getAttribute("data-order") !== "14")
			);
		},
	});

	function winGame() {
		if (trySecond.classList.contains("hidden")) {
			item8.classList.remove("move_down");
			item14.classList.remove("move_up");
		} else {
			item14.classList.remove("move_down");
			item8.classList.remove("move_up");
		}

		// slot8.classList.remove("move");
		// slot14.classList.remove("move");
		// mainSound.play();
		if (
			slot8.classList.contains("active") ||
			slot14.classList.contains("active")
		) {
			setTimeout(() => {
				document.body.classList.add("show-result");
				wrapper.classList.add("show-result");
				if (trySecond.classList.contains("hidden")) {
					winFirst.play();
				} else {
					winLast.play();
				}
			}, 500);

			setTimeout(() => {
				if (!trySecond.classList.contains("hidden")) {
					// console.log("sec", trySecond.classList.contains("hidden"));
					document.body.classList.add("show-last");
					wrapper.classList.add("show-last");
					modalWrapper.classList.add("show-last");
				}
			}, 800);

			setTimeout(() => {
				wrapper.classList.add("show-modal");
			}, 2000);
		}
	}

	function updateSlots() {
		const slots = document.querySelectorAll(".slot__item");
		const ordersToUpdate = ["6", "7", "9", "10", "11", "8"];

		slots.forEach((slot) => {
			if (slot.classList.contains("active")) {
				slot.classList.remove("active");
			}

			const order = slot.getAttribute("data-order");
			if (ordersToUpdate.includes(order)) {
				const img = slot.querySelector("img");
				if (img) {
					img.setAttribute("src", "images/5.png");
				}
			}

			if (order === "8") {
				// slot8.classList.add("move");
				item8.classList.add("move_up");
			}

			if (order === "14") {
				// slot14.classList.add("move");
				item14.classList.add("move_down");
				const img = slot.querySelector("img");
				if (img) {
					img.setAttribute("src", "images/3.png");
				}
			}
		});
	}

	modalBotton.addEventListener("click", () => {
		clickSound.play();
		updateSlots();
		first.classList.add("hidden");
		last.classList.add("visibil");
		tryFirst.classList.add("hidden");
		trySecond.classList.remove("hidden");

		setTimeout(() => {
			wrapper.classList.remove("show-modal");
		}, 800);
		setTimeout(() => {
			document.body.classList.remove("show-result");
			wrapper.classList.remove("show-result");
		}, 1300);

		setTimeout(() => {
			modalContent.classList.add("hidden");
			modalContent2.classList.remove("hidden");
		}, 2500);
	});

	btnLast.addEventListener("click", () => {
		clickSound.play();
	});
});
