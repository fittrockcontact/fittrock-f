export interface FAQItem {
  question: string;
  answer: string;
  category: 'desks' | 'motors' | 'shipping' | 'warranty' | 'assembly';
}

export const faqsData: FAQItem[] = [
  {
    category: 'motors',
    question: 'What is the difference between Dual Motor (KUBER) and Single Motor (RATI)?',
    answer:
      'Dual Motor desks feature synchronized German-spec motors in each leg, offering a 125 kg weight capacity, faster 35mm/s transit, enhanced stability at maximum 1190mm height, and whisper-quiet (<42 dB) operation. Single Motor desks feature one motor connected via a hex driveshaft with an 80 kg weight capacity and 25mm/s speed, ideal for compact or budget-friendly home workstations.',
  },
  {
    category: 'motors',
    question: 'How loud are Fittrock motorized desks during height transition?',
    answer:
      'Fittrock dual-motor desks operate under 42 dB—quieter than a normal library whisper. Transitions between seated (710mm) and standing (1190mm) height take less than 6 seconds without disturbing calls or video meetings.',
  },
  {
    category: 'assembly',
    question: 'How difficult is the desk assembly? Do tabletops have pre-drilled holes?',
    answer:
      'Setup is beginner-friendly and takes just 15 to 20 minutes. All Fittrock solid engineered wood tabletops come with precision CNC pre-drilled threaded insert holes. Every desk box includes labeled Allen keys, screws, cable clips, and a step-by-step video guide.',
  },
  {
    category: 'shipping',
    question: 'Do you offer free delivery across India? How long does shipping take?',
    answer:
      'Yes! All motorized standing desks qualify for 100% Free Express Shipping across 19,000+ pin codes. Orders are dispatched from our Pune manufacturing facility within 24 hours. Delivery takes 5 to 7 days across India.',
  },
  {
    category: 'warranty',
    question: 'What does the 3-Year Frame and 1-Year Motor Warranty cover?',
    answer:
      'Our 3-Year Frame Warranty covers all structural cold-rolled steel columns, legs, and feet against bending or weld failure. The 1-Year Electrical Replacement Warranty covers motors, control box circuit boards, power transformers, and the LED digital memory handset.',
  },
  {
    category: 'shipping',
    question: 'What is your 10-Day Trial & Return Policy?',
    answer:
      'We offer a 10-Day Risk-Free Trial. If you are not satisfied with your ergonomic standing desk, contact us within 10 days of delivery. We will arrange a doorstep reverse pickup and refund your purchase amount back to your original bank/UPI account.',
  },
  {
    category: 'desks',
    question: 'Can I use my own custom tabletop with Fittrock desk frames?',
    answer:
      'Yes! You can purchase the KUBER or RATI frame standalone. Our telescoping steel frames adjust horizontally from 1000mm to 1600mm, accommodating custom wooden tabletops between 1100mm and 2000mm in length and 600mm to 850mm in depth.',
  },
  {
    category: 'desks',
    question: 'Do you provide B2B GST tax invoices for claiming Input Tax Credit (ITC)?',
    answer:
      'Yes! During checkout, enter your company name and 15-digit GSTIN. An official digitally-signed GST Tax Invoice with our GSTIN will be automatically generated and emailed to you for claiming 18% Input Tax Credit.',
  },
];
