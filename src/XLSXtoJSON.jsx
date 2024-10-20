import React, { useState } from "react";
import * as XLSX from "xlsx";

const Convertor = () => {
  const [jsonOutput, setJsonOutput] = useState([]);
  const [csvOutput, setCsvOutput] = useState("");

  //   const handleFile = (e) => {
  //     let file = e.target.files[0];
  //     // console.log("file --> ", file);

  //     const reader = new FileReader();
  //     reader.onload = function (event) {
  //       //   const data = event.target.result;
  //       //   const rows = data.split("\n");
  //       //   //   console.log("rows --> ", rows);
  //       //   const result = [];
  //       //   const headers = rows[0].split(","); // Assuming first row contains headers
  //       //   for (let i = 1; i < rows.length; i++) {
  //       //     const obj = {};
  //       //     const row = rows[i].split(",");
  //       //     headers.forEach((header, index) => {
  //       //       obj[header] = row[index];
  //       //     });
  //       //     result.push(obj);
  //       //   }
  //       //   console.log("result --> ", result);
  //       //   setJsonOutput(result);

  //       const data = new Uint8Array(event.target.result);
  //       let csvContent = "";

  //       // This is very simplified and may not work for all XLSX files
  //       // It assumes a straightforward XLSX structure, for illustration purposes
  //       const view = new DataView(data.buffer);
  //       for (let i = 0; i < view.byteLength; i++) {
  //         // Converting Uint8Array to a string for CSV
  //         csvContent += String.fromCharCode(view.getUint8(i));
  //       }

  //       // Split CSV content to rows and process headers, etc.
  //       const rows = csvContent.split("\n");
  //       const csvArray = rows.map((row) => row.split(",").join(",")).join("\n");

  //       setCsvOutput(csvArray);
  //     };

  //     // reader.readAsText(file);
  //     reader.readAsArrayBuffer(file);
  //   };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const jsonValues = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      );

      console.log("jsonValues --> ", jsonValues);
      setJsonOutput(jsonValues);
    };

    reader.readAsArrayBuffer(file);
  };

  // <div>
  //               <table>
  //                 <thead>
  //                   <tr>Name</tr>
  //                   <tr>Age</tr>
  //                   <tr>Relationship</tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>{item.Name}</tr>
  //                   <tr>{item.Age}</tr>
  //                   <tr>{item.Relationship}</tr>
  //                 </tbody>
  //               </table>
  //             </div>

  // Styles

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
    fontFamily: "Arial, sans-serif",
  };

  const thTdStyle = {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  };

  const trEvenStyle = {
    backgroundColor: "#f9f9f9",
  };

  const trHoverStyle = {
    cursor: "pointer", // Inline hover style
  };

  // Return method

  return (
    <div>
      <input type="file" onChange={handleFile} accept=".xlsx" />
      {/* <pre>{JSON.stringify(jsonOutput, null, 2)}</pre> */}
      {/* <pre>{jsonOutput}</pre> */}
      <div>
        {jsonOutput.length > 0 ? (
          <div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Age</th>
                  <th style={thStyle}>Relationship</th>
                </tr>
              </thead>
              <tbody>
                {jsonOutput.map((item, index) => (
                  <tr
                    key={index}
                    style={index % 2 === 0 ? trEvenStyle : {}}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        trHoverStyle.cursor)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? trEvenStyle.backgroundColor : "")
                    }
                  >
                    <td style={thTdStyle}>{item.Name}</td>
                    <td style={thTdStyle}>{item.Age}</td>
                    <td style={thTdStyle}>{item.Relationship}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          "No file selected"
        )}
      </div>
    </div>
  );
};

export default Convertor;
