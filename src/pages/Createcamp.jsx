import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // <--- Added Axios
import { 
  Building, User, FileText, Upload, DollarSign, 
  CreditCard, CheckCircle, Plus, Trash2, AlertTriangle 
} from 'lucide-react';
// import { FileText, PlusCircle, Layout } from 'lucide-react';

const CreateCampaign = () => {
  const navigate = useNavigate();

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    // Organization Info
    orgName: '',
    regNumber: '',
    website: '',
    establishedYear: '',
    
    // Rep Info
    repName: '',
    repEmail: '',
    repPhone: '',
    repPosition: '',

    // Campaign Basics
    title: '',
    category: 'Environment',
    location: '',
    deadline: '',
    image: '',
    
    // The Pitch
    goal: '',
    volunteersNeeded: '',
    description: '',
    risks: '',

    // Bank Details
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: ''
  });

  // --- BUDGET STATE ---
  const [budgetItems, setBudgetItems] = useState([{ item: '', cost: '' }]);

  // --- FILE UPLOAD STATE (Mock) ---
  const [files, setFiles] = useState({
    registrationDoc: null,
    taxDoc: null,
    idProof: null
  });

  // Handle Text Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File "Uploads"
  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0]?.name });
  };

  // Budget Logic
  const handleBudgetChange = (index, field, value) => {
    const newBudget = [...budgetItems];
    newBudget[index][field] = value;
    setBudgetItems(newBudget);
  };
  const addBudgetRow = () => setBudgetItems([...budgetItems, { item: '', cost: '' }]);
  const removeBudgetRow = (index) => setBudgetItems(budgetItems.filter((_, i) => i !== index));

  // --- CONNECT TO BACKEND HERE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in to create a campaign!");
        navigate('/login');
        return;
      }

      // Map your complex form data to the simpler Backend Model
      const campaignPayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        organizer: formData.orgName, // We use Org Name as the organizer
        image: formData.image,
        goalAmount: formData.goal,
        volunteersNeeded: formData.volunteersNeeded,
        deadline: formData.deadline,
        budget: budgetItems, // Send the budget list!
      };

      // Send to Server
      await axios.post('http://localhost:5000/api/campaigns', campaignPayload, {
        headers: { Authorization: token }
      });

      alert("Campaign Created Successfully! 🎉");
      navigate('/campaigns');

    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-5xl mx-auto px-4 py-12">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Launch a Verified Campaign
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            To ensure the safety of our donors, we require full documentation. 
            All campaigns undergo a manual verification process before going live.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* --- SECTION 1: ORGANIZATION DETAILS --- */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-emerald-900 px-6 py-4 flex items-center">
              <Building className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-bold text-white">Organization Details</h3>
            </div>
            <div className="p-6 sm:p-8 grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="label-text">Official NGO / Organization Name</label>
                <input required name="orgName" onChange={handleChange} type="text" className="input-field" placeholder="e.g. Green Earth Foundation" />
              </div>
              <div>
                <label className="label-text">Registration / License Number</label>
                <input required name="regNumber" onChange={handleChange} type="text" className="input-field" placeholder="Govt. Reg ID" />
              </div>
              <div>
                <label className="label-text">Year Established</label>
                <input required name="establishedYear" onChange={handleChange} type="number" className="input-field" placeholder="2010" />
              </div>
              <div className="md:col-span-2">
                <label className="label-text">Website / Social Handle</label>
                <input name="website" onChange={handleChange} type="url" className="input-field" placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* --- SECTION 2: REPRESENTATIVE INFO --- */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-emerald-900 px-6 py-4 flex items-center">
              <User className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-bold text-white">Representative Info</h3>
            </div>
            <div className="p-6 sm:p-8 grid gap-6 md:grid-cols-2">
              <div>
                <label className="label-text">Full Name</label>
                <input required name="repName" onChange={handleChange} type="text" className="input-field" placeholder="Point of Contact" />
              </div>
              <div>
                <label className="label-text">Position / Designation</label>
                <input required name="repPosition" onChange={handleChange} type="text" className="input-field" placeholder="e.g. Director, Secretary" />
              </div>
              <div>
                <label className="label-text">Official Email</label>
                <input required name="repEmail" onChange={handleChange} type="email" className="input-field" placeholder="name@org.com" />
              </div>
              <div>
                <label className="label-text">Phone Number</label>
                <input required name="repPhone" onChange={handleChange} type="tel" className="input-field" placeholder="+1 ..." />
              </div>
            </div>
          </div>

          {/* --- SECTION 3: CAMPAIGN DETAILS --- */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-emerald-900 px-6 py-4 flex items-center">
              <FileText className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-bold text-white">Campaign Overview</h3>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <label className="label-text">Campaign Title</label>
                <input required name="title" onChange={handleChange} type="text" className="input-field" placeholder="Make it catchy and clear" />
              </div>
              
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="label-text">Category</label>
                  <select name="category" onChange={handleChange} className="input-field bg-white">
                    <option>Environment</option>
                    <option>Education</option>
                    <option>Disaster Relief</option>
                    <option>Animal Welfare</option>
                    <option>Medical</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Location</label>
                  <input required name="location" onChange={handleChange} type="text" className="input-field" placeholder="City, State" />
                </div>
                <div>
                  <label className="label-text">End Date</label>
                  <input required name="deadline" onChange={handleChange} type="date" className="input-field" />
                </div>
              </div>

              <div>
                <label className="label-text">Cover Image URL</label>
                <div className="relative">

                  <input required name="image" onChange={handleChange} type="url" className="input-field p-7" placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="label-text">The Story (Why is this needed?)</label>
                <textarea required name="description" onChange={handleChange} rows="5" className="input-field" placeholder="Describe the urgency, the beneficiaries, and the plan..."></textarea>
              </div>
            </div>
          </div>

          {/* --- SECTION 4: FINANCIALS & BUDGET --- */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-emerald-900 px-6 py-4 flex items-center">
              <DollarSign className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-bold text-white">Financials & Budget</h3>
            </div>
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Bank Info */}
              <div className="grid gap-6 md:grid-cols-2 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="md:col-span-2 flex items-center mb-2">
                   <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
                   <h4 className="font-bold text-gray-700">Beneficiary Bank Account</h4>
                </div>
                <div>
                  <label className="label-text text-xs uppercase text-gray-500">Account Name</label>
                  <input required name="accountName" onChange={handleChange} type="text" className="input-field" />
                </div>
                <div>
                  <label className="label-text text-xs uppercase text-gray-500">Account Number</label>
                  <input required name="accountNumber" onChange={handleChange} type="text" className="input-field" />
                </div>
                <div>
                  <label className="label-text text-xs uppercase text-gray-500">Bank Name</label>
                  <input required name="bankName" onChange={handleChange} type="text" className="input-field" />
                </div>
                <div>
                  <label className="label-text text-xs uppercase text-gray-500">IFSC / Routing Code</label>
                  <input required name="ifscCode" onChange={handleChange} type="text" className="input-field" />
                </div>
              </div>

              {/* Goals */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="label-text">Total Fundraising Goal ($)</label>
                  <input required name="goal" onChange={handleChange} type="number" className="input-field text-xl font-bold text-emerald-700" placeholder="0.00" />
                </div>
                <div>
                  <label className="label-text">Volunteers Needed (Count)</label>
                  <input required name="volunteersNeeded" onChange={handleChange} type="number" className="input-field" placeholder="0" />
                </div>
              </div>

              {/* Dynamic Budget */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="label-text flex items-center">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" /> 
                    Budget Breakdown (Required for Authenticity)
                  </label>
                  <button type="button" onClick={addBudgetRow} className="text-sm font-bold text-emerald-600 flex items-center hover:text-emerald-700">
                    <Plus className="w-4 h-4 mr-1" /> Add Row
                  </button>
                </div>
                <div className="space-y-3">
                  {budgetItems.map((row, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <input 
                        type="text" 
                        placeholder="Item Description" 
                        className="grow input-field"
                        value={row.item}
                        onChange={(e) => handleBudgetChange(index, 'item', e.target.value)}
                        required
                      />
                      <input 
                        type="number" 
                        placeholder="Cost" 
                        className="w-32 input-field"
                        value={row.cost}
                        onChange={(e) => handleBudgetChange(index, 'cost', e.target.value)}
                        required
                      />
                      {budgetItems.length > 1 && (
                        <button type="button" onClick={() => removeBudgetRow(index)} className="text-red-400 hover:text-red-600 p-2">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* --- SECTION 5: DOCUMENT UPLOAD --- */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-emerald-900 px-6 py-4 flex items-center">
              <Upload className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-bold text-white">Verification Documents</h3>
            </div>
            <div className="p-6 sm:p-8 grid gap-6 md:grid-cols-2">
              
              {/* Doc 1 */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Registration Certificate</p>
                <p className="text-xs text-gray-500 mb-4">(PDF, JPG, PNG)</p>
                <input type="file" name="registrationDoc" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                {files.registrationDoc && <p className="mt-2 text-xs text-emerald-600 font-bold">Selected: {files.registrationDoc}</p>}
              </div>

              {/* Doc 2 */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Tax Exemption (80G/501c3)</p>
                <p className="text-xs text-gray-500 mb-4">(Optional)</p>
                <input type="file" name="taxDoc" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
              </div>

            </div>
          </div>

          {/* --- SUBMIT --- */}
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-4 text-sm text-gray-500">
               <input type="checkbox" required className="mr-2 w-4 h-4 text-emerald-600 rounded" />
               I certify that the information provided is accurate and I am authorized to represent this organization.
            </div>
            <button
              type="submit"
              className="bg-emerald-600 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center"
            >
              Submit Application <CheckCircle className="ml-2 w-6 h-6" />
            </button>
          </div>

        </form>
      </div>

      
      {/* Reusable CSS Class for Inputs */}
      <style>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }
        .label-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default CreateCampaign;