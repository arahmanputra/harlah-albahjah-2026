$(document).ready(function () {
  $(".event-card").each(function () {
    const startDate = new Date($(this).data("start"));
    const endDate = new Date($(this).data("end"));
    const today = new Date();

    // Reset jam biar akurat
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const statusBadge = $(this).find(".event-status");
    const dateText = $(this).find(".event-date");

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const formattedStart = startDate.toLocaleDateString("id-ID", options);
    const formattedEnd = endDate.toLocaleDateString("id-ID", options);

    dateText.text(`${formattedStart} - ${formattedEnd}`);

    if (today < startDate) {
      statusBadge.addClass("bg-secondary").text("Coming Soon");
    } else if (today >= startDate && today <= endDate) {
      statusBadge.addClass("bg-success").text("Active");
    } else {
      statusBadge.addClass("bg-danger").text("Ended");
    }
  });
});
