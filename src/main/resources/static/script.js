let liste = [];

function kjopBillett() {
  const film = $("#film-liste").val();
  const antall = $("#antall-felt").val();
  const fornavn = $("#fornavn-felt").val();
  const etternavn = $("#etternavn-felt").val();
  const telefonnr = $("#telefonnr-felt").val();
  const epost = $("#epost-felt").val();

  if (!validerNavn(fornavn, telefonnr, epost)) {
    return;
  }

  let kunde = {
    film: film,
    antall: parseInt(antall, 10),
    fornavn: fornavn,
    etternavn: etternavn,
    telefonnummer: parseInt(telefonnr, 10), // Assuming phone number is to be stored as integer
    epost: epost,
  };

  $.post(
    "/lagre",
    JSON.stringify(kunde),
    function () {
      hentAlle();
    },
    "json"
  ).fail(function () {
    alert("Error saving data");
  });

  clearInputFields();
  updateErrorMessages(kunde);
}

function validerNavn(fNavn, tlf, epost) {
  const regexp_navn = /^[A-Za-z ]{0,20}$/; // Allow space in names
  const regex_epost = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const regex_tlf = /^[0-9]{8}$/;

  let isValid = true;

  if (!regexp_navn.test(fNavn)) {
    $("#tom-fornavn").html("Fornavnet må være mellom 0 og 20 bokstaver");
    isValid = false;
  } else {
    $("#tom-fornavn").html("");
  }

  if (!regex_epost.test(epost)) {
    $("#tom-epost").html("Eposten er feil");
    isValid = false;
  } else {
    $("#tom-epost").html("");
  }

  if (!regex_tlf.test(tlf)) {
    $("#tom-telefonnr").html("Telefon er feil");
    isValid = false;
  } else {
    $("#tom-telefonnr").html("");
  }

  return isValid;
}

function clearInputFields() {
  $("#film-liste").val("");
  $("#antall-felt").val("");
  $("#fornavn-felt").val("");
  $("#etternavn-felt").val("");
  $("#telefonnr-felt").val("");
  $("#epost-felt").val("");
}

function updateErrorMessages(kunde) {
  // Simplified for brevity
}
