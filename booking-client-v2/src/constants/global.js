export const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const genderOption = [
  {
    value: "",
    label: "Chọn giới tính",
    disabled: true,
  },
  {
    value: "M",
    label: "Nam",
  },
  {
    value: "F",
    label: "Nữ",
  },
];
export const dateFormatList = [
  "DD/MM/YYYY",
  "DD/MM/YY",
  "DD-MM-YYYY",
  "DD-MM-YY",
  "HH:mm",
];

export const qualificationOptions = [
  {
    value: "",
    label: "Chọn trình độ ",
    disabled: true,
  },
  { label: "Cử nhân", value: "CN" },
  { label: "Tiến sĩ", value: "TS" },
  { label: "Bác sĩ", value: "BS" },
];
export const statusOptions = [
  {
    value: "",
    label: "Chọn trạng thái ",
    disabled: true,
  },
  { label: "Đang chờ", value: "P" },
  { label: "Đã xong", value: "S" },
];

export const dunmyPatient = {
  ic: generateRandomNumberString(12),
  name: "Bệnh nhân demo",
  phone: generateRandomNumberString(10),
  gender: "M",
  dob: "01-01-1999",
  addressHome: "Địa chỉ demo",
  bloodgroup: "B+",
  medication: "Tim",
};
export const dunmyDoctor = {
  ic: generateRandomNumberString(12),
  name: "Bác sĩ demo",
  phone: generateRandomNumberString(10),
  gender: "M",
  dob: "01-01-1999",
  qualification: "BS",
  major: "Y học",
};

//util

function generateRandomNumberString(length) {
  const characters = "0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
