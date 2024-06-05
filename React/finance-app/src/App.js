// import logo from './logo.svg';
// import './App.css';
import React, {useState, useEffect} from 'react'
import api from './api'

// function App() {
//   return (
//     <div >
//       <h1>
//         Hello!
//       </h1>
//     </div>
//   );
// }
const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: '',
  });

  const fetchTransactions = async () => {
    const response = await api.get('/transactions/');
    setTransactions(response.data)
  };

  // when app.js loads, useEffect will load the fetchTransactions which gets all of the transactions from fastapi app
  useEffect(() => {
    fetchTransactions();
  }, [])

  // expects an event of checkbox getting clicked or not, which is the boolean for the is_income in the form
  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };


  // handle form submit
  const handleFormSubmit = async (event) => {
    // prevents default submission
    event.preventDefault();
    // post transaction to database
    await api.post('/transactions/', formData);
    // fetchTransaction after submission to keep it up to date
    fetchTransactions();
    // clering the form after submission
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: '',
    });
  };

  return (
        <div >
          <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                Finance App
              </a>
            </div>
          </nav>

          <div className="container">
            <form onSubmit={handleFormSubmit}>

              {/* Amount */}
              <div className="mb-3 mt-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input type="text" className="form-control" id="amount" name="amount" onChange={handleInputChange} value={formData.amount} />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input type="text" className="form-control" id="category" name="category" onChange={handleInputChange} value={formData.category} />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                Description
                </label>
                <input type="text" className="form-control" id="description" name="description" onChange={handleInputChange} value={formData.description} />
              </div>

              {/* Income */}
              <div className="mb-3">
                <label htmlFor="is_income" className="form-label">
                Income?
                </label>
                <input type="checkbox" id="is_income" name="is_income" onChange={handleInputChange} value={formData.is_income} />
              </div>

              {/* Date */}
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                Date
                </label>
                <input type="text" className="form-control" id="date" name="date" onChange={handleInputChange} value={formData.date} />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>

            </form>
          </div>

          <table className="table table-striped table-bordered table-hover mb-3 mt-5">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Income</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.amount}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>
      );

};


export default App;
