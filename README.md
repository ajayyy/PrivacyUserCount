# Privacy User Counter

This helps count the number of users accessing your service in a very privacy friendly way.

- The main server calls this secondary server for every request
    - It passes a hashed version of the IP address in this request
- This user counter hashes and salts the (already hashed) IP and saves it in memory
- Every 48 hours, the size of the set is saved in an array to store the last 14 days worth of user counts
    - The set is then cleared
    - A new salt is generated

This is good for privacy for several reasons:

- IPs are only stored hashed and salted with the salt rotating every 48 hours
- Hashed IPs are not associated with the contents of the request
- Data is only stored in memory

# Usage

Install nodejs and npm

`npm install`

`npm start`

# How to use

This was build for [SponsorBlock](https://github.com/ajayyy/SponsorBlockServer), but can be used by any service.

Simply send a request to the following endpoint for every request recieved on your service. You must hash the IP first on the service-side before sending it.

**POST** `/api/v1/addIP?hashedIP=<hashed-ip-goes-here>`

Then, you can get the users using the following request:

**GET** `/api/v1/userCount`

Response:

```json
{
    "userCount": number
}
```

It will update every 48 hours and return the max number of unique users in the last 28 days.
