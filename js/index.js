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

    const optionsFull = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const sameDay =
      startDate.getTime() === endDate.getTime();

    const sameMonth =
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear();

    let formattedDate = "";

    // =====================
    // FORMAT TANGGAL
    // =====================
    if (sameDay) {
      formattedDate = startDate.toLocaleDateString("id-ID", optionsFull);
    } 
    else if (sameMonth) {
      const dayStart = startDate.getDate();
      const dayEnd = endDate.getDate();
      const monthYear = endDate.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });

      formattedDate = `${dayStart} - ${dayEnd} ${monthYear}`;
    } 
    else {
      const formattedStart = startDate.toLocaleDateString("id-ID", optionsFull);
      const formattedEnd = endDate.toLocaleDateString("id-ID", optionsFull);
      formattedDate = `${formattedStart} - ${formattedEnd}`;
    }

    // =====================
    // HITUNG DURASI
    // =====================
    const duration =
      Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    if (duration > 1) {
      formattedDate += ` (${duration} Hari)`;
    }

    dateText.text(formattedDate);

    // =====================
    // STATUS EVENT
    // =====================
    if (today < startDate) {
      const diffDays = Math.ceil(
        (startDate - today) / (1000 * 60 * 60 * 24)
      );

      statusBadge
        .addClass("bg-secondary")
        .text(`Mulai ${diffDays} Hari Lagi`);
    } 
    else if (today >= startDate && today <= endDate) {
      if (sameDay) {
        statusBadge
          .addClass("bg-info")
          .text("Hari Ini");
      } else {
        statusBadge
          .addClass("bg-success")
          .text("Sedang Berlangsung");
      }
    } 
    else {
      statusBadge
        .addClass("bg-danger")
        .text("Telah Berakhir");
    }
  });
});