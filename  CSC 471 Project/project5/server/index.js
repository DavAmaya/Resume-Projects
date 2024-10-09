const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

/*





        */

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "CSC471Prj",
});

/*





        */

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*





        */

//employee table
app.get("/api/getEmp", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    res.send(result);
  });
});

app.get("/api/searchEmp", (req, res) => {
  db.query("SELECT * FROM employees WHERE Fname = ?", (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const startTime = performance.now();
  const ssn = req.body.ssn;
  const dob = req.body.dob;
  const Fname = req.body.Fname;
  const Minit = req.body.Minit;
  const Lname = req.body.Lname;

  db.query(
    "INSERT INTO employees (ssn, dob, Fname, Minit, Lname) VALUES (?,?,?,?,?)",
    [ssn, dob, Fname, Minit, Lname],
    (err, result) => {
      console.log(result);
    }
  );
  const endTime = performance.now();
  const runtime = `${(endTime - startTime).toFixed(6)}`;
  res.status(200).json({ message: "Table updated successfully", runtime });
});

app.delete("/api/delete/:ssn", (req, res) => {
  const startTime = performance.now();
  const ssn = req.params.ssn;

  db.query("DELETE FROM manager WHERE ssn = ?", ssn, (err, result) => {
    if (err) console.log(err);
  });

  db.query("DELETE FROM salary_Emp WHERE ssn = ?", ssn, (err, result) => {
    if (err) console.log(err);
  });

  db.query("DELETE FROM hourly_Emp WHERE ssn = ?", ssn, (err, result) => {
    if (err) console.log(err);
  });

  db.query("DELETE FROM employees WHERE ssn = ?", ssn, (err, result) => {
    if (err) console.log(err);
  });
  const endTime = performance.now();
  const runtime = ` ${(endTime - startTime).toFixed(6)} `;
  res.status(200).json({ message: "Table updated successfully", runtime });
});

app.put("/api/update/", (req, res) => {
  const startTime = performance.now();
  const ssn = req.body.ssn;
  const updates = [];

  // Add non-null and non-empty string values to the `updates` array
  if (req.body.dob && req.body.dob !== "") {
    updates.push("`dob` = ?");
  }
  if (req.body.Fname && req.body.Fname !== "") {
    updates.push("`Fname` = ?");
  }
  if (req.body.Minit && req.body.Minit !== "") {
    updates.push("`Minit` = ?");
  }
  if (req.body.Lname && req.body.Lname !== "") {
    updates.push("`Lname` = ?");
  }

  if (updates.length === 0) {
    // No non-null and non-empty string values to update, return early
    return res.status(400).json({ message: "No values to update" });
  }

  const values = [];

  // Add non-null and non-empty string values to the `values` array
  if (req.body.dob && req.body.dob !== "") {
    values.push(req.body.dob);
  }
  if (req.body.Fname && req.body.Fname !== "") {
    values.push(req.body.Fname);
  }
  if (req.body.Minit && req.body.Minit !== "") {
    values.push(req.body.Minit);
  }
  if (req.body.Lname && req.body.Lname !== "") {
    values.push(req.body.Lname);
  }

  values.push(ssn);

  db.query(
    `UPDATE employees SET ${updates.join(", ")} WHERE ssn = ?`,
    values,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating table" });
      }

      if (result.affectedRows === 0) {
        // No rows were affected, which means the ssn value doesn't match any record in the database
        return res.status(404).json({ message: "Record not found" });
      }

      console.log(result);
      const endTime = performance.now();
      const runtime = ` ${(endTime - startTime).toFixed(6)} `;
      res.status(200).json({ message: "Table updated successfully", runtime });
    }
  );
});

/*





        */

//manager table
app.get("/api/getMan", (req, res) => {
  db.query("SELECT * FROM manager", (err, result) => {
    res.send(result);
  });
});

app.get("/api/searchMan", (req, res) => {
  db.query("SELECT * FROM manager WHERE office_Num = ?", (err, result) => {
    res.send(result);
  });
});

app.post("/api/insertMan", (req, res) => {
  const startTime = performance.now();
  const ssn = req.body.ssn;
  const office_Num = req.body.office_Num;
  const start_date = req.body.start_date;

  db.query(
    "INSERT INTO manager (ssn, office_Num, start_date) VALUES (?,?,?)",
    [ssn, office_Num, start_date],
    (err, result) => {
      console.log(result);
    }
  );
  const endTime = performance.now();
  const runtime = `${(endTime - startTime).toFixed(6)}`;
  res.status(200).json({ message: "Table updated successfully", runtime });
});

app.delete("/api/deleteMan/:ssn", (req, res) => {
  const startTime = performance.now();
  const ssn = req.params.ssn;
  db.query("DELETE FROM manager WHERE ssn = ?", ssn, (err, result) => {
    if (err) console.log(err);
  });

  db.query("DELETE FROM salary_Emp WHERE ssn = ?", ssn, (err, result) => {
    if (err) console.log(err);
  });
  const endTime = performance.now();
  const runtime = `${(endTime - startTime).toFixed(6)}`;
  res.status(200).json({ message: "Table updated successfully", runtime });
});

app.put("/api/updateMan/", (req, res) => {
  const startTime = performance.now();
  const ssn = req.body.ssn;
  const updates = [];

  // Add non-null and non-empty string values to the update array
  if (req.body.office_Num && req.body.office_Num !== "") {
    updates.push("`office_Num` = ?");
  }
  if (req.body.start_date && req.body.start_date !== "") {
    updates.push("`start_date` = ?");
  }

  const values = [];

  // Add non-null and non-empty string values to the values array
  if (req.body.office_Num && req.body.office_Num !== "") {
    values.push(req.body.office_Num);
  }
  if (req.body.start_date && req.body.start_date !== "") {
    values.push(req.body.start_date);
  }

  values.push(ssn);

  db.query(
    `UPDATE manager SET ${updates.join(", ")} WHERE ssn = ?`,
    values,
    (err, result) => {

      if (result.affectedRows === 0) {
        // No rows were affected, which means the ssn value doesn't match any record in the database
        return res.status(404).json({ message: "Record not found" });
      }

      console.log(result);
    }
  );
  const endTime = performance.now();
  const runtime = `${(endTime - startTime).toFixed(6)}`;
  res.status(200).json({ message: "Table updated successfully", runtime });
});

/*





        */

// hourly Emp table
app.get("/api/getHr", (req, res) => {
  db.query("SELECT * FROM hourly_Emp", (err, result) => {
    res.send(result);
  });
});

app.get("/api/searchHr", (req, res) => {
  db.query("SELECT * FROM hourly_Emp WHERE hourly = ?", (err, result) => {
    res.send(result);
  });
});

app.post("/api/insertHr", (req, res) => {
  const startTime = performance.now();
  const ssn = req.body.ssn;
  const hourly = req.body.hourly;

  db.query(
    "INSERT INTO hourly_Emp (ssn, hourly) VALUES (?,?)",
    [ssn, hourly],
    (err, result) => {
      console.log(result);
    }
  );
  const endTime = performance.now();
  const runtime = `${(endTime - startTime).toFixed(6)}`;
  res.status(200).json({ message: "Table updated successfully", runtime });
});

app.delete("/api/deleteHr/:ssn", (req, res) => {
  const startTime = performance.now();
  const ssn = req.params.ssn;
  db.query("DELETE FROM hourly_Emp WHERE ssn = ?", ssn, (err, result) => {
    if (err) console.log(err);
  });
  const endTime = performance.now();
  const runtime = `${(endTime - startTime).toFixed(6)}`;
  res.status(200).json({ message: "Table updated successfully", runtime });
});

app.put("/api/updateHr/", (req, res) => {
  const startTime = performance.now();
  const ssn = req.body.ssn;
  const updates = [];

  // Add non-null and non-empty string values to the update array
  if (req.body.hourly && req.body.hourly !== "") {
    updates.push("`hourly` = ?");
  }

  if (updates.length === 0) {
    // No non-null and non-empty string values to update, return early
    return res.status(400).json({ message: "No values to update" });
  }

  const values = [];

  // Add non-null and non-empty string values to the values array
  if (req.body.hourly && req.body.hourly !== "") {
    values.push(req.body.hourly);
  }

  values.push(ssn);

  db.query(
    `UPDATE hourly_Emp SET ${updates.join(", ")} WHERE ssn = ?`,
    values,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating table" });
      }

      if (result.affectedRows === 0) {
        // No rows were affected, which means the ssn value doesn't match any record in the database
        return res.status(404).json({ message: "Record not found" });
      }

      
    }
  );
  const endTime = performance.now();
  const runtime = `${(endTime - startTime).toFixed(6)}`;
  res.status(200).json({ message: "Table updated successfully", runtime });
});

/*





        */
//salaries Emp table
app.get("/api/getSal", (req, res) => {
  db.query("SELECT * FROM salary_Emp", (err, result) => {
    res.send(result);
  });
});

app.get("/api/searchSal", (req, res) => {
  db.query("SELECT * FROM salary_Emp WHERE salary = ?", (err, result) => {
    res.send(result);
  });
});

app.post("/api/insertSal", (req, res) => {
  const startTime = performance.now();
  const ssn = req.body.ssn;
  const salary = req.body.salary;

  db.query(
    "INSERT INTO salary_Emp (ssn, salary) VALUES (?,?)",
    [ssn, salary],
    (err, result) => {
      console.log(result);
    }
  );
  const endTime = performance.now();
  const runtime = `${(endTime - startTime).toFixed(6)}`;
  res.status(200).json({ message: "Table updated successfully", runtime });
});

app.delete("/api/deleteSal/:ssn", (req, res) => {
  const startTime = performance.now();
  const ssn = req.params.ssn;
  db.query("DELETE FROM salary_Emp WHERE ssn = ?", ssn, (err, result) => {
    if (err) console.log(err);
  });
  const endTime = performance.now();
  const runtime = `${(endTime - startTime).toFixed(6)}`;
  res.status(200).json({ message: "Table updated successfully", runtime });
});

app.put("/api/updateSal/", (req, res) => {
  const startTime = performance.now();
  const ssn = req.body.ssn;
  const updates = [];

  // Add non-null and non-empty string values to the update array
  if (req.body.salary && req.body.salary !== "") {
    updates.push("`salary` = ?");
  }

  if (updates.length === 0) {
    // No non-null and non-empty string values to update, return early
    return res.status(400).json({ message: "No values to update" });
  }

  const values = [];

  // Add non-null and non-empty string values to the values array
  if (req.body.salary && req.body.salary !== "") {
    values.push(req.body.salary);
  }

  values.push(ssn);

  db.query(
    `UPDATE salary_Emp SET ${updates.join(", ")} WHERE ssn = ?`,
    values,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating table" });
      }

      if (result.affectedRows === 0) {
        // No rows were affected, which means the ssn value doesn't match any record in the database
        return res.status(404).json({ message: "Record not found" });
      }

      console.log(result);
      res.status(200).json({ message: "Table updated successfully" });
    }
  );
  const endTime = performance.now();
  const runtime = `${(endTime - startTime).toFixed(6)}`;
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
