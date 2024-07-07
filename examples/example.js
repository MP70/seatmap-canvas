$(document).ready(function () {
    let seatmap = new SeatMapCanvas("#seats_container", {
        legend: true,
        style: {
            seat: {
                hover: '#8fe100',
                color: '#f0f7fa',
                selected: '#8fe100',
                check_icon_color: '#fff',
                not_salable: '#0088d3',
                focus: '#8fe100',
            },
            legend: {
                font_color: '#3b3b3b',
                show: false
            },
            block: {
                title_color: '#fff'
            }
        }
    });


    seatmap.eventManager.addEventListener("SEAT.CLICK", (seat) => {
        if (!seat.isSelected() && seat.item.salable === true) {
            seat.select()
        } else {
            seat.unSelect()
        }

        updateSelectedSeats()
    });


    // FOR DEMO

    const generateRandomBlocks = function () {
        let block_colors = ["#01a5ff", "#fccf4e", "#01a5ff", "#01a5ff"];
        let blocks = []
        let last_x = 0;
        for (let j = 0; j < 4; j++) { // blocks

            let color = block_colors[j];

            let seats = []
            let cell_count = 0;
            let row_count = 0;
            let block_final_x = 0;
            let randomSeatCount = Math.round((Math.random() * (Math.abs(400 - 200))) + 200)
            let randomCell = Math.round((Math.random() * (Math.abs(28 - 12))) + 12)
            let blockTitle = `Block ${j + 1}`;

            for (let k = 0; k < randomSeatCount; k++) { // row
                if (k % randomCell === 0) {
                    cell_count = 1;
                    row_count++;
                }

                let x = (cell_count * 33) + last_x;
                let y = row_count * 30;

                if (block_final_x < x) block_final_x = x;
                let salable = Math.ceil(Math.random() * 10) > 3;
                let randomPrice = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) * 10

                let seat = {
                    id: `s-${k}`,
                    x: x,
                    y: y,
                    color: color, // can use item.color from json data
                    salable: salable,
                    custom_data: {
                        any: "things",
                        price: randomPrice,
                        basket_name: `${blockTitle} - ${cell_count} ${row_count}`
                    },
                    note: "note test",
                    tags: {},
                    title: `${blockTitle}\n${cell_count} ${row_count}`
                }
                cell_count++;
                seats.push(seat)
            }

            last_x = block_final_x + 100;

            let block = {
                "id": `block-${j}`,
                "title": blockTitle,
                "labels": [],
                "color": color,
                "seats": seats
            };

            blocks.push(block);
        }

        seatmap.data.replaceData(blocks);
    }
    const unselectSeat = function () {
        let seatId = $(this).attr('seat-id');
        let blockId = $(this).attr('block-id');
        let seat = seatmap.data.getSeat(seatId, blockId);
        seat.svg.unSelect()
        updateSelectedSeats()
    }

    const updateSelectedSeats = function () {
        let selectedSeats = seatmap.data.getSelectedSeats();

        let seatsTemplateHtml = ``

        if (selectedSeats.length === 0) {
            seatsTemplateHtml = `
                    <tr class="text-center py-2 px-2 flex flex-col">
                        <td class="text-lg text-gray-400"><i class="fa-regular fa-face-rolling-eyes"></i></td>
                        <td class="text-gray-400">No selected seat</td>
                    </tr>
                `
        }

        for (let i = 0; i < selectedSeats.length; i++) {
            let selectedSeat = selectedSeats[i];

            let priceFormatted = selectedSeat.custom_data.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })

            let html = `<tr class="w-full cursor-default border-b dark:bg-gray-950 h-8 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 py-1 px-2 items-center">
                    <td class="w-6">
                        <div class="inline-block w-3 h-3 bg-[#8fe100] rounded-lg ml-1"></div>
                    </td>
                    <td class="flex-0">${selectedSeat.custom_data.basket_name}</td>
                    <td class="text-right font-bold">${priceFormatted}</td>
                    <td class="w-6 unselect-seat text-center cursor-pointer text-red-200 hover:text-red-500" seat-id="${selectedSeat.id}" block-id="${selectedSeat.block.id}">
                        <i class="fa-solid fa-xmark text-md "></i>
                    </td>
                </tr>`

            seatsTemplateHtml += html;
        }

        if (selectedSeats.length > 0) {
            let totalPrice = selectedSeats.reduce((accumulator, currentValue) => accumulator + currentValue.custom_data.price, 0)
            let priceFormatted = totalPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
            let seatDesc = selectedSeats.length === 1 ? 'a seat' : `${selectedSeats.length} seats`;
            seatsTemplateHtml += `
                    <tr class="border-t cursor-default h-6 text-center bg-gray-200 dark:bg-gray-900 dark:text-white">
                        <td colspan="4" class="py-1">Total: <strong>${priceFormatted}</strong> for ${seatDesc} </td>
                    </tr>
                `
        }

        $('#selected-seats').html(seatsTemplateHtml)

        $(".unselect-seat").on('click', unselectSeat)
    }

    generateRandomBlocks()
    updateSelectedSeats()


    $("#zoomout-button").on("click", function () {
        seatmap.zoomManager.zoomToVenue();
    });

    $(".zoom-to-block").on("click", function (a) {
        let blockId = $(this).attr('data-block-id');
        seatmap.zoomManager.zoomToBlock(blockId);
    });
    $("#get-selected-seats").on("click", function (a) {
        let selectedSeats = seatmap.data.getSelectedSeats();
        console.log(selectedSeats)
    });

    // $(".unselect-seat").on("click", function (a) {
    //
    // });

    $("#randomize-btn").on("click", function (a) {
        generateRandomBlocks()
    });
    $("#dark-mode-btn").on("click", function (a) {
        $('html').toggleClass('dark')
    });
});