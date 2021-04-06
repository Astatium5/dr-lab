#### Dr. Lab - HooHacks 2021 Project
## Inspiration
The current process of going to a doctor seems inefficient for us, because it involves too many unnecessary actions from a doctor. The whole US and WHO trend now is relying on minimizing the patient-doctor physical interaction. This has led us to the idea that we can help to optimize this process by creating a web app, which is used for sharing medical pictures, which can be used for coming up with a diagnosis.

## What it does
It is a web service, which serves as a platform for uploading photos from medical devices, which can take photos, and a doctor would only need that photo and maybe the results of the physical exam to come up with a diagnosis. Some examples of such photos could be photos from a colposcope used to diagnose cervical cancer, from which about 450,000 women die each year. One more example could be diagnosing melanoma, papilloma, or birthmarks in dermatology. With that in mind, we have decided that a good idea would be to add an opportunity for several doctors to review the image and physical test results so that they avoid the possibility of making an error as much as possible. After several doctors (we were thinking of three) review the given data, the main one would come up with the final decision and submit the final diagnosis, which gets automatically sent to the patient. If the result is bad, the doctors can advice the patient to go to some clinic. Also, to completely eliminate the physical contact between a patient and a doctor, all the photos and physical exams can be done by a specifically trained nurse.

## How we built it
We have used FERN (Firebase, Express.js, React.js, Node.js) stack to build this web app. We have used the mailgun API to automatically send emails, PostMan and swagger to document and test the API endpoints. We have used heroku to deploy this app.

Devpost link: [*click*](https://devpost.com/software/dr-lab)
