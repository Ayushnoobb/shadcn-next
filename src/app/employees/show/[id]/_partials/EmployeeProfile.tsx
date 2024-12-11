import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Edit, Phone, Mail, MapPin, Calendar, User, Briefcase } from 'lucide-react';
import { InfoItem } from './EmployeeInfoItem';

const EmployeeProfile = () => {
    
  const employeeData = {
    name: "Stephan Peralt",
    role: "Software Developer",
    experience: "10+ years of Experience",
    clientId: "CLT-0024",
    team: "UI/UX Design",
    joinDate: "1st Jan 2023",
    reportTo: "Doglas Martini",
    about: "As an award winning designer, I deliver exceptional quality work and bring value to your brand! With 10 years of experience and 350+ projects completed worldwide with satisfied customers, I developed the 360° brand approach, which helped me to create numerous brands that are relevant, meaningful and loved.",
    basicInfo: {
      phone: "(163) 2459 315",
      email: "peralt12@example.com",
      gender: "Male",
      birthday: "24th July 2000",
      address: "1861 Bayonne Ave, Manchester, NJ, 08759"
    },
    personalInfo: {
      passportNo: "QRET4566FGRT",
      passportExpDate: "15 May 2029",
      nationality: "Indian",
      religion: "Christianity",
      maritalStatus: "Yes",
      spouseEmployment: "No"
    },
    projects: [
      {
        name: "World Health",
        tasks: 8,
        completed: 15,
        deadline: "31 July 2025",
        lead: "Leona"
      },
      {
        name: "Hospital Administration",
        tasks: 8,
        completed: 15,
        deadline: "31 July 2025",
        lead: "Leona"
      }
    ]
  };

  return (
    <div className="mx-auto p-4 mb-8">
      <div className="bg-gradient-to-r bg-primary dark:bg-background rounded-t-lg  relative py-4 px-4 mb-8">
        <div className=" flex items-start">
          <div className="bg-white rounded-full p-1 mr-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={48} className="text-gray-400" />
            </div>
          </div>
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-white">{employeeData.name}</h1>
            <div className="flex items-center text-white/90">
              <span>{employeeData.role}</span>
              <span className="mx-2">•</span>
              <span>{employeeData.experience}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">Basic Information</h2>
              <Edit className="w-4 h-4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem icon={<Phone className="w-4 h-4" />} label="Phone" value={employeeData.basicInfo.phone} />
              <InfoItem icon={<Mail className="w-4 h-4" />} label="Email" value={employeeData.basicInfo.email} />
              <InfoItem icon={<User className="w-4 h-4" />} label="Gender" value={employeeData.basicInfo.gender} />
              <InfoItem icon={<Calendar className="w-4 h-4" />} label="Birthday" value={employeeData.basicInfo.birthday} />
              <InfoItem icon={<MapPin className="w-4 h-4" />} label="Address" value={employeeData.basicInfo.address} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <Edit className="w-4 h-4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem label="Passport No" value={employeeData.personalInfo.passportNo} />
              <InfoItem label="Passport Exp Date" value={employeeData.personalInfo.passportExpDate} />
              <InfoItem label="Nationality" value={employeeData.personalInfo.nationality} />
              <InfoItem label="Religion" value={employeeData.personalInfo.religion} />
              <InfoItem label="Marital Status" value={employeeData.personalInfo.maritalStatus} />
              <InfoItem label="Employment of Spouse" value={employeeData.personalInfo.spouseEmployment} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">About Employee</h2>
              <Edit className="w-4 h-4" />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-white">{employeeData.about}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Projects</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {employeeData.projects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary dark:text-gray-600" />
                      </div>
                      <h3 className="font-semibold">{project.name}</h3>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{project.tasks} tasks</span>
                      <span>{project.completed} Completed</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Deadline</p>
                        <p className="font-medium">{project.deadline}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Project Lead</p>
                        <p className="font-medium">{project.lead}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};


export default EmployeeProfile;