# Hello World (or rather Amortization) JavaScript Azure Function 

This repo contains a simple javascript based Azure Function, which implements the same amortization calculation like the Java examples, so we can compare.

Start it locally: 

```
func start
```

And invoke it:

```
curl "http://localhost:7071/api/amortization?totalLoan=100.0&currentInterestRate=0.01&repaymentPerYear=50.0"
```

This will result in

```
{
  "totalPaymentAmount": "101.53",
  "lastPayment": "1.53",
  "years": 3
}
```

To deploy to azure, see file `deploy.sh`:

```
export RESOURCE_GROUP=REPLACE_ME
./deploy.sh
```