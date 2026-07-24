const fetch = require('node-fetch');

async function test() {
  const payload = {
    dFrom: "2026-07-24", 
    dTo: "2026-07-24",
    stat: "",
    karantina: "",
    upt: "3200",
    jnsAju: "EKSPOR",
    jeniscari: "noAju",
    noAju: "30104S1B829502026072400003"
  };
  
  const res = await fetch('https://api.karantinaindonesia.go.id/ssm/getAju', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  console.log(JSON.stringify(data.data[0], null, 2));
}

test();
