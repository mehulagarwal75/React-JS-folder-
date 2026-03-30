import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type EmployeeType = {
    empId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    gender: string;
    skills: string[];
    experience: string;
    salary: string;
    joiningDate: string;
    address: string;
};

type ErrorType = {
    empId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    department?: string;
    designation?: string;
    gender?: string;
    skills?: string;
    experience?: string;
    salary?: string;
    joiningDate?: string;
    address?: string;
};

const DEPARTMENTS = ["IT", "HR", "Finance", "Marketing", "Sales", "Operations"] as const;
const DESIGNATIONS = [
    "Software Engineer",
    "Senior Developer",
    "Team Lead",
    "Project Manager",
    "HR Executive",
    "Marketing Manager",
    "Sales Executive",
    "Accountant"
] as const;
const SKILLS_LIST = ["React", "Angular", "Node.js", "Python", "Java", "UI/UX", "Data Analysis", "Project Management"] as const;

export default function EmployeeForm() {
    const [formData, setFormData] = useState<EmployeeType>({
        empId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        gender: "",
        skills: [],
        experience: "",
        salary: "",
        joiningDate: "",
        address: ""
    });

    const [errors, setErrors] = useState<ErrorType>({});

    const { empId, firstName, lastName, email, phone, department, designation, gender, skills, experience, salary, joiningDate, address } = formData;

    const validateForm = (): boolean => {
        const newErrors: ErrorType = {};
        
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonePattern = /^[6789]\d{9}$/;

        if (!empId.trim()) newErrors.empId = "Employee ID is required";
        if (!firstName.trim()) newErrors.firstName = "First name is required";
        if (!lastName.trim()) newErrors.lastName = "Last name is required";
        
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!phonePattern.test(phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }
        
        if (!department) newErrors.department = "Please select a department";
        if (!designation) newErrors.designation = "Please select a designation";
        if (!gender) newErrors.gender = "Please select gender";
        if (skills.length === 0) newErrors.skills = "Please select at least one skill";
        if (!experience) newErrors.experience = "Please enter years of experience";
        if (!salary) newErrors.salary = "Please enter salary";
        if (!joiningDate) newErrors.joiningDate = "Please select joining date";
        if (!address.trim()) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof EmployeeType) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field as keyof ErrorType]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, gender: e.target.value }));
        if (errors.gender) setErrors(prev => ({ ...prev, gender: undefined }));
    };

    const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            skills: checked 
                ? [...prev.skills, value]
                : prev.skills.filter(skill => skill !== value)
        }));
        if (errors.skills && checked) {
            setErrors(prev => ({ ...prev, skills: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        console.log("Employee Data:", formData);
        toast.success("Employee added successfully!");
        
        setFormData({
            empId: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            department: "",
            designation: "",
            gender: "",
            skills: [],
            experience: "",
            salary: "",
            joiningDate: "",
            address: ""
        });
    };

    const getErrorClass = (fieldName: keyof ErrorType) => {
        return errors[fieldName] ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-purple-400';
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            
            {/* Background Decoration */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 via-white to-purple-50"></div>
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-5xl">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg mb-4">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            Employee Registration
                        </h1>
                        <p className="text-gray-600">Add new employee information to the system</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 sm:px-8 py-5">
                            <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Employee Registration Form
                            </h2>
                            <p className="text-purple-100 text-sm mt-1 ml-8">
                                Please fill all the required fields marked with <span className="text-yellow-300 font-semibold">*</span>
                            </p>
                        </div>

                        <form className="p-6 sm:p-8 space-y-6" onSubmit={handleSubmit}>
                            {/* Employee ID */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Employee ID <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0h4" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={empId}
                                        onChange={handleInputChange('empId')}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white ${getErrorClass('empId')}`}
                                        placeholder="EMP001"
                                    />
                                </div>
                                {errors.empId && <p className="mt-1 text-red-500 text-sm flex items-center gap-1"><span className="text-xs">⚠️</span> {errors.empId}</p>}
                            </div>

                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={handleInputChange('firstName')}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white ${getErrorClass('firstName')}`}
                                            placeholder="John"
                                        />
                                    </div>
                                    {errors.firstName && <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={handleInputChange('lastName')}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white ${getErrorClass('lastName')}`}
                                            placeholder="Doe"
                                        />
                                    </div>
                                    {errors.lastName && <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={handleInputChange('email')}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white ${getErrorClass('email')}`}
                                            placeholder="john.doe@company.com"
                                        />
                                    </div>
                                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={handleInputChange('phone')}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white ${getErrorClass('phone')}`}
                                            placeholder="9876543210"
                                        />
                                    </div>
                                    {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
                                </div>
                            </div>

                            {/* Department & Designation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Department <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <select
                                            value={department}
                                            onChange={handleInputChange('department')}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 outline-none bg-gray-50 hover:bg-white cursor-pointer appearance-none"
                                        >
                                            <option value="">Select Department</option>
                                            {DEPARTMENTS.map((dept) => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.department && <p className="mt-1 text-red-500 text-sm">{errors.department}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Designation <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <select
                                            value={designation}
                                            onChange={handleInputChange('designation')}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 outline-none bg-gray-50 hover:bg-white cursor-pointer appearance-none"
                                        >
                                            <option value="">Select Designation</option>
                                            {DESIGNATIONS.map((desig) => (
                                                <option key={desig} value={desig}>{desig}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.designation && <p className="mt-1 text-red-500 text-sm">{errors.designation}</p>}
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-6">
                                    {['Male', 'Female', 'Other'].map((option) => (
                                        <label key={option} className="flex items-center space-x-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option}
                                                checked={gender === option}
                                                onChange={handleGenderChange}
                                                className="w-5 h-5 text-purple-600 focus:ring-purple-500 border-gray-300"
                                            />
                                            <span className="text-gray-700 group-hover:text-purple-600 transition">{option}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.gender && <p className="mt-1 text-red-500 text-sm">{errors.gender}</p>}
                            </div>

                            {/* Skills */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Skills <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {SKILLS_LIST.map((skill) => (
                                        <label key={skill} className="flex items-center space-x-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                value={skill}
                                                checked={skills.includes(skill)}
                                                onChange={handleSkillChange}
                                                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                                            />
                                            <span className="text-sm text-gray-700 group-hover:text-purple-600 transition px-2 py-1 rounded-lg group-hover:bg-purple-50">
                                                {skill}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {errors.skills && <p className="mt-1 text-red-500 text-sm">{errors.skills}</p>}
                            </div>

                            {/* Experience & Salary */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Years of Experience <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="number"
                                            value={experience}
                                            onChange={handleInputChange('experience')}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white ${getErrorClass('experience')}`}
                                            placeholder="3"
                                            min="0"
                                            step="0.5"
                                        />
                                    </div>
                                    {errors.experience && <p className="mt-1 text-red-500 text-sm">{errors.experience}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Salary (CTC) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            value={salary}
                                            onChange={handleInputChange('salary')}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white ${getErrorClass('salary')}`}
                                            placeholder="₹ 5,00,000"
                                        />
                                    </div>
                                    {errors.salary && <p className="mt-1 text-red-500 text-sm">{errors.salary}</p>}
                                </div>
                            </div>

                            {/* Joining Date */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Joining Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="date"
                                        value={joiningDate}
                                        onChange={handleInputChange('joiningDate')}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white ${getErrorClass('joiningDate')}`}
                                    />
                                </div>
                                {errors.joiningDate && <p className="mt-1 text-red-500 text-sm">{errors.joiningDate}</p>}
                            </div>

                            {/* Address */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <textarea
                                        rows={3}
                                        value={address}
                                        onChange={handleInputChange('address')}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white ${getErrorClass('address')} resize-none`}
                                        placeholder="Enter complete address"
                                    />
                                </div>
                                {errors.address && <p className="mt-1 text-red-500 text-sm">{errors.address}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Register Employee
                                    </span>
                                </button>
                            </div>

                            {/* Required Fields Note */}
                            <p className="text-xs text-gray-400 text-center mt-4">
                                <span className="text-red-500">*</span> Required fields
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Add these keyframes to your global CSS or add a style tag */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </>
    );
}