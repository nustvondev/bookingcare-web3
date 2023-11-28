// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Record {
    // dinh nghia benh nhan
    struct Patients {
        string ic;
        string name;
        string gender;
        string phone;
        string dob;
        string addressHome;
        string bloodgroup;
        string medication;
        string avatar;
        address addr;
        uint256 date;
    }
    // dinh nghia bac si
    struct Doctors {
        string ic;
        string name;
        string phone;
        string gender;
        string dob;
        string qualification;
        string major;
        string avatar;
        address addr;
        uint256 date;
    }
    // dinh nghia booking
    struct Appointments {
        address doctoraddr;
        address patientaddr;
        string date;
        string time;
        string prescription;
        string description;
        string diagnosis;
        string status;
        uint256 creationDate;
    }
    // maping va quan ly quyen truy cap
    address public owner;
    address[] public patientList;
    address[] public doctorList;
    address[] public appointmentList;

    mapping(address => Patients) public patients;
    mapping(address => Doctors) public doctors;
    mapping(address => Appointments) public appointments;

    mapping(address => mapping(address => bool)) public isApproved;
    mapping(address => bool) public isPatient;
    mapping(address => bool) public isDoctor;
    mapping(address => uint256) public AppointmentPerPatient;
    // quan ly cac doi tuong ban dau
    uint256 public patientCount = 0;
    uint256 public doctorCount = 0;
    uint256 public appointmentCount = 0;
    uint256 public permissionGrantedCount = 0;

    // khoi tao ham constructor
    constructor() {
        owner = msg.sender;
    }

    // truy xuat thong tin benh nhan va luu vao blockchian
    function setDetails(
        string memory _ic,
        string memory _name,
        string memory _gender,
        string memory _phone,
        string memory _dob,
        string memory _addressHome,
        string memory _bloodgroup,
        string memory _medication,
        string memory _avatar
    ) public {
        require(!isPatient[msg.sender]);
        Patients storage p = patients[msg.sender];

        p.ic = _ic;
        p.name = _name;
        p.gender = _gender;
        p.phone = _phone;
        p.dob = _dob;
        p.addressHome = _addressHome;
        p.bloodgroup = _bloodgroup;
        p.medication = _medication;
        p.avatar = _avatar;
        p.addr = msg.sender;
        p.date = block.timestamp;

        patientList.push(msg.sender);
        isPatient[msg.sender] = true;
        isApproved[msg.sender][msg.sender] = true;
        patientCount++;
    }

    // cho phep benh nhan co quyen chinh sua vao record da ton tai
    function editDetails(
        string memory _ic,
        string memory _name,
        string memory _gender,
        string memory _phone,
        string memory _dob,
        string memory _addressHome,
        string memory _bloodgroup,
        string memory _medication,
        string memory _avatar
    ) public {
        require(isPatient[msg.sender]);
        Patients storage p = patients[msg.sender];

        p.ic = _ic;
        p.name = _name;
        p.gender = _gender;
        p.phone = _phone;
        p.dob = _dob;
        p.addressHome = _addressHome;
        p.bloodgroup = _bloodgroup;
        p.medication = _medication;
        p.avatar = _avatar;
        p.addr = msg.sender;
    }

    // truy xuat thong tin bac si va luu vao blockchian
    function setDoctor(
        string memory _ic,
        string memory _name,
        string memory _phone,
        string memory _gender,
        string memory _dob,
        string memory _qualification,
        string memory _major,
        string memory _avatar
    ) public {
        require(!isDoctor[msg.sender]);
        Doctors storage d = doctors[msg.sender];

        d.ic = _ic;
        d.name = _name;
        d.phone = _phone;
        d.gender = _gender;
        d.dob = _dob;
        d.qualification = _qualification;
        d.major = _major;
        d.avatar = _avatar;
        d.addr = msg.sender;
        d.date = block.timestamp;

        doctorList.push(msg.sender);
        isDoctor[msg.sender] = true;
        doctorCount++;
    }

    // cho phep bac si co quyen chinh sua vao record da ton tai
    function editDoctor(
        string memory _ic,
        string memory _name,
        string memory _phone,
        string memory _gender,
        string memory _dob,
        string memory _qualification,
        string memory _major,
        string memory _avatar
    ) public {
        require(isDoctor[msg.sender]);
        Doctors storage d = doctors[msg.sender];

        d.ic = _ic;
        d.name = _name;
        d.phone = _phone;
        d.gender = _gender;
        d.dob = _dob;
        d.qualification = _qualification;
        d.major = _major;
        d.avatar = _avatar;
        d.addr = msg.sender;
    }

    // luu tru booking vao blochchain
    function setAppointment(
        address _addr,
        string memory _date,
        string memory _time,
        string memory _diagnosis,
        string memory _prescription,
        string memory _description,
        string memory _status
    ) public {
        require(isDoctor[msg.sender]);
        Appointments storage a = appointments[_addr];

        a.doctoraddr = msg.sender;
        a.patientaddr = _addr;
        a.date = _date;
        a.time = _time;
        a.diagnosis = _diagnosis;
        a.prescription = _prescription;
        a.description = _description;
        a.status = _status;
        a.creationDate = block.timestamp;

        appointmentList.push(_addr);
        appointmentCount++;
        AppointmentPerPatient[_addr]++;
    }

    // cap nhat thong tin booking vao blockchain
    function updateAppointment(
        address _addr,
        string memory _date,
        string memory _time,
        string memory _diagnosis,
        string memory _prescription,
        string memory _description,
        string memory _status
    ) public {
        require(isDoctor[msg.sender]);
        Appointments storage a = appointments[_addr];

        a.doctoraddr = msg.sender;
        a.patientaddr = _addr;
        a.date = _date;
        a.time = _time;
        a.diagnosis = _diagnosis;
        a.prescription = _prescription;
        a.description = _description;
        a.status = _status;
    }

    // nguoi so huu cap phep cho bac si xem thong tin
    function givePermission(address _address) public returns (bool success) {
        isApproved[msg.sender][_address] = true;
        permissionGrantedCount++;
        return true;
    }

    // nguoi so huu xoa quyen xem cua bac si
    function RevokePermission(address _address) public returns (bool success) {
        isApproved[msg.sender][_address] = false;
        return true;
    }

    // lay danh sach benh nhan
    function getPatients() public view returns (address[] memory) {
        return patientList;
    }

    // lay danh sach bac si
    function getDoctors() public view returns (address[] memory) {
        return doctorList;
    }

    // lay danh sach booking
    function getAppointments() public view returns (address[] memory) {
        return appointmentList;
    }

    // tim kiem dia chi benh nhan duoc cap phep
    function searchPatientDemographic(
        address _address
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(isApproved[_address][msg.sender]);

        Patients storage p = patients[_address];

        return (p.ic, p.name, p.phone, p.dob, p.gender, p.avatar);
    }

    // tim kiem dia chi benh nhan duoc cap phep
    function searchPatientMedical(
        address _address
    )
        public
        view
        returns (string memory, string memory, string memory, string memory)
    {
        require(isApproved[_address][msg.sender]);

        Patients storage p = patients[_address];

        return (p.addressHome, p.bloodgroup, p.medication, p.gender);
    }

    // tim kiem bac si dua vao dia chi
    function searchDoctor(
        address _address
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(isDoctor[_address]);

        Doctors storage d = doctors[_address];

        return (
            d.ic,
            d.name,
            d.phone,
            d.gender,
            d.dob,
            d.qualification,
            d.major,
            d.avatar
        );
    }

    // tim kiem thong tin booking dua vao dia chi
    function searchAppointment(
        address _address
    )
        public
        view
        returns (
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        Appointments storage a = appointments[_address];
        Doctors storage d = doctors[a.doctoraddr];

        return (
            a.doctoraddr,
            d.name,
            a.date,
            a.time,
            a.diagnosis,
            a.prescription,
            a.description,
            a.status
        );
    }

    // tim kiem ngay tao ho so benh nhan bang cach nhap đaa chi benh nhan
    function searchRecordDate(address _address) public view returns (uint256) {
        Patients storage p = patients[_address];

        return (p.date);
    }

    // tim kiem ngay tao ho so bac si bang cach nhap dia chi benh nhan
    function searchDoctorDate(address _address) public view returns (uint256) {
        Doctors storage d = doctors[_address];

        return (d.date);
    }

    // tim kiem ngay tao cuoc hen bang cach nhap dia chi benh nhan
    function searchAppointmentDate(
        address _address
    ) public view returns (uint256) {
        Appointments storage a = appointments[_address];

        return (a.creationDate);
    }

    // truy xuat so luong benh nhan
    function getPatientCount() public view returns (uint256) {
        return patientCount;
    }

    // truy xuat so luong bac si
    function getDoctorCount() public view returns (uint256) {
        return doctorCount;
    }

    // truy xuat so luong booking
    function getAppointmentCount() public view returns (uint256) {
        return appointmentCount;
    }

    // truy xuat so luong quyen duoc cap
    function getPermissionGrantedCount() public view returns (uint256) {
        return permissionGrantedCount;
    }

    // truy xuat so luong quyen duoc cap
    function getAppointmentPerPatient(
        address _address
    ) public view returns (uint256) {
        return AppointmentPerPatient[_address];
    }
}
