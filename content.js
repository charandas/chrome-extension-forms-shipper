const port = chrome.runtime.connect({name: "knockknock"});

// Article DropDown Number (important as far as driving the logic, even if the serial itself is not useful)
const driving_field = '#form-field-name'

const fields_pii = {
    // Email
    email: '#form-field-field_73e261c',
    // First Name
    first_name: '#first_name',
    // Last Name
    last_name: '#last_name'
}

const fields_affected_by_driving_field = {
    // Title
    title: '#form-field-field_8d95f46',
    // URL
    url: '#form-field-field_11694e0',
    // Date
    publication_date: '#form-field-field_d6dc6b3',
    // Channel
    channel: '#form-field-field_c6c1572',
    // Channel email
    channel_email: '#form-field-field_296556d',
    // Subject
    subject: '#form-field-field_5547412',
    // Dear Email (not necessary, static)
    // '#dear_email',
    // Complaint description
    complaint_descriptiom: '#form-field-field_9f63b1b'
}

document.querySelector('#scroll-to-form-btn').addEventListener('click', addEventListenersForAllFields)

function addEventListenersForAllFields() {
    document
        .querySelector(driving_field)
        .addEventListener('change',function(event) {
            console.log(driving_field, "changed to", event.target.value)
            console.log("getting initial values on select")
            // TODO: if the website can detect that the user
            // has installed the extension, we can make this
            // better, otherwise, fields on initial load
            // are being missed. Here, I have put a random
            // 1 second wait to avoid that from happening
            // it seems to work fine. We can't wait too long
            // or else we may compete with user's actual change detection
            setTimeout(() => {
                Object.keys(fields_affected_by_driving_field).forEach(field => {
                    console.log(field)
                    const sel = document.querySelector(fields_affected_by_driving_field[field])
                    console.log(sel.value)
                    port.postMessage({key: field, value: sel.value, initial: true})
                });
            }, 1000)
        });

        addEventListenerForFields(fields_pii)
        addEventListenerForFields(fields_affected_by_driving_field)
}

function addEventListenerForFields(fields_map) {
    Object.keys(fields_map).forEach(field => {
        console.log(field, "is being listened to for changes")
        document
            .querySelector(fields_map[field])
            .addEventListener('change',function(event) {
                console.log(field, "changed to", event.target.value)
                port.postMessage({key: field, value: event.target.value});
            });
    })
}

