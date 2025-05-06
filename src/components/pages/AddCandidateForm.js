import React, { useState, useEffect } from 'react';
import '../styles/AddCandidateForm.css';

const AddCandidateForm = () => {
    const sections = ['Candidate Details', 'Experience & More', 'Interview Details', 'Feedback'];
    const [currentSection, setCurrentSection] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        client: '',
        position: '',
        interviewDate: '',
        interviewer: '',
        feedback: '',
        totalExperience: '',
        currentCTC: '',
        expectedCTC: '',
        linkedinUrl: '',
        videoUrl: '',
        currentLocation: '',
        noticePeriod: '',
        servingNoticePeriod: '',
        lastWorkingDay: ''
    });

    useEffect(() => {
        const savedData = localStorage.getItem('candidateFormData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('candidateFormData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => setCurrentSection((prev) => prev + 1);
    const handlePrev = () => setCurrentSection((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
    
            const mappedData = {
                Candidate_Name: formData.fullName,
                Email_ID: formData.email,
                Contact_No: parseInt(formData.phone),
                Client: formData.client,
                Position: formData.position,
                Interviewer: formData.interviewer,
                Video_Link: formData.videoUrl,
                Linkedin_URL: formData.linkedinUrl,
                TE: formData.totalExperience,
                CTC: formData.currentCTC,
                Expected_CTC: formData.expectedCTC,
                notice_period: parseInt(formData.noticePeriod), // Or map "90 days" to 90
                serving_notice_period: formData.servingNoticePeriod === "Yes",
                last_working_day: formData.lastWorkingDay,
                Feedback: formData.feedback_interviewer,
                Aman_Feedback: formData.feedback_aman,
                Dhawal_Feedback: formData.feedback_dhawal,
                Nimit_Feedback: formData.feedback_nimit,
                Second_Round_Video_Link: "", // Set if you have a second video URL
            };
    
            const response = await fetch("http://127.0.0.1:8000/api/v2/candidate/candidate_tracker/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "token": token,
                },
                body: JSON.stringify(mappedData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Submission failed");
            }
    
            const result = await response.json();
            alert(`Candidate ${result.Candidate_Name} added successfully!`);
            localStorage.removeItem("candidateFormData");
    
            // Reset form here if needed
        } catch (error) {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        }
    };
    
    

    return (
        <div className="form-wrapper">
            <h2 className="form-title">Candidate Tracker</h2>

            <div className="tabs">
                {sections.map((section, idx) => (
                    <div
                        key={idx}
                        className={`tab ${idx === currentSection ? 'active' : ''}`}
                        onClick={() => setCurrentSection(idx)}
                    >
                        {section}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="candidate-form">
                {currentSection === 0 && (
                    <fieldset className="form-section">
                        <legend>Candidate Details</legend>

                        <label>Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                        <label>Contact</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

                        <label>LinkedIn URL</label>
                        <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} />
                    </fieldset>
                )}

                {currentSection === 1 && (
                    <fieldset className="form-section">
                        <legend>Experience & More</legend>

                        <label>Total Experience</label>
                        <input type="text" name="totalExperience" value={formData.totalExperience} onChange={handleChange} />

                        <label>Current CTC</label>
                        <input type="text" name="currentCTC" value={formData.currentCTC} onChange={handleChange} />

                        <label>Expected CTC</label>
                        <input type="text" name="expectedCTC" value={formData.expectedCTC} onChange={handleChange} />

                        <label>Current Location</label>
                        <input type="text" name="currentLocation" value={formData.currentLocation} onChange={handleChange} />

                        <label>Notice Period</label>
                        <select name="noticePeriod" value={formData.noticePeriod} onChange={handleChange}>
                            <option value="">Select Notice Period</option>
                            <option value="15 days">15 days</option>
                            <option value="30 days">30 days</option>
                            <option value="60 days">60 days</option>
                            <option value="90 days">90 days</option>
                        </select>

                        <label>Serving Notice Period</label>
                        <select name="servingNoticePeriod" value={formData.servingNoticePeriod} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>

                        {formData.servingNoticePeriod === 'Yes' && (
                            <>
                                <label>Last Working Day</label>
                                <input
                                    type="date"
                                    name="lastWorkingDay"
                                    value={formData.lastWorkingDay}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                    </fieldset>
                )}

                {currentSection === 2 && (
                    <fieldset className="form-section">
                        <legend>Interview Details</legend>

                        <label>Client</label>
                        <input type="text" name="client" value={formData.client} onChange={handleChange} required />

                        <label>Position</label>
                        <input type="text" name="position" value={formData.position} onChange={handleChange} required />

                        <label>Interview Date</label>
                        <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} required />

                        <label>Interviewer</label>
                        <input type="text" name="interviewer" value={formData.interviewer} onChange={handleChange} required />

                        <label>Round 1 Video </label>
                        <input type="url" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />

                        <label>Round 2 Video </label>
                        <input type="url" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />

                        {/* <label>Video URL</label>
                        <input type="url" name="videoUrl" value={formData.videoUrl} onChange={handleChange} /> */}
                    </fieldset>
                )}

                {currentSection === 3 && (
                    <fieldset className="form-section">
                        <legend>Feedback</legend>

                        {['Interviewer', 'Nimit', 'Dhawal', 'Aman'].map((name) => (
                            <React.Fragment key={name}>
                                <label>{name}'s Feedback</label>
                                <textarea
                                    name={`feedback_${name.toLowerCase()}`}
                                    rows="3"
                                    value={formData[`feedback_${name.toLowerCase()}`] || ''}
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFormData((prev) => ({ ...prev, [name]: value }));
                                    }}
                                    required
                                />
                            </React.Fragment>
                        ))}
                    </fieldset>
                )}

                <div className="form-navigation">
                    {currentSection > 0 && (
                        <button type="button" onClick={handlePrev}>
                            Previous
                        </button>
                    )}
                    {currentSection < sections.length - 1 ? (
                        <button type="button" onClick={handleNext}>
                            Next
                        </button>
                    ) : (
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddCandidateForm;
