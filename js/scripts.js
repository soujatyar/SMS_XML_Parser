let xmlPath=""; //give XML path here eg. sample.xml

function getvalue() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("unique_contact");
    li = ul.getElementsByTagName("div");
    var contacts = [];
    for (let i = 0; i < li.length; i++) {
      let a = li[i].getElementsByTagName("button")[0];
      txtValue = a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  let xmlContent = "";
  fetch(xmlPath).then((response) => {
    response.text().then((xml) => {
      xmlContent = xml;

      let parser = new DOMParser();
      let xmlDOM = parser.parseFromString(xmlContent, "application/xml");
      let sms_count = xmlDOM.querySelectorAll("sms");

      let unique_contacts_set = new Set();
      unique_contacts_set = uniqueContacts(sms_count);
    });
  });

  function uniqueContacts(sms_count) {
    let uniqueSet = new Map();
    sms_count.forEach((smsXmlNode) => {
      let address = smsXmlNode.getAttribute("address");
      let name = smsXmlNode.getAttribute("contact_name");
      uniqueSet.set(address, name);
    });

    for (let [address, name] of uniqueSet) {
      sms_count1 = sms_count;
      address1 = address;
      name1 = name;
      // console.log(name);
      if (name1 == "(Unknown)") {
        contact_name = address;
      } else {
        contact_name = name1;
      }
      temp = document.createElement("div");
      let eachMessage =
        '<button onclick="findMsg(this,sms_count1)" data-tip="' +
        address +
        '" class="messages__item btn btn-primary m-1">' +
        contact_name +
        "</button>";
      temp.innerHTML = eachMessage;
      document.getElementById("unique_contact").appendChild(temp);
    }
  }

  function findMsg(button, sms_count) {
    let number = button.getAttribute("data-tip");
    document.getElementById("messages").innerHTML = "";
    sms_count.forEach((smsXmlNode) => {
      let address = smsXmlNode.getAttribute("address");
      if (number == address) {
        let body = smsXmlNode.getAttribute("body");
        let type = smsXmlNode.getAttribute("type");
        let dateTime = smsXmlNode.getAttribute("readable_date");
        temp = document.createElement("div");
        let eachMessage =
          type == "2"
            ? "<div class='message-orange'> <p class='message-content'>" +
              body +
              "</p><div class='message-timestamp'>" +
              dateTime +
              "</div> </div>"
            : type == "1"
            ? "<div class='message-blue'> <p class='message-content'>" +
              body +
              "</p><div class='message-timestamp'>" +
              dateTime +
              "</div> </div>"
            : "";
        temp.innerHTML = eachMessage;
        document.getElementById("messages").appendChild(temp);
      }
    });
  }