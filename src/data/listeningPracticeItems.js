export const listeningPracticeItems = [
  {
    id: 'listening-001',
    slug: 'flowers-order-taking',
    title: 'Flowers Order Taking',
    level: 'A2',
    category: 'Customer Service',
    context: 'order taking',
    audioUrl: '/audio/listening/audio-1-flowers-order-taking.mp3',
    audioType: 'audio/mpeg',
    estimatedTime: '5 min',
    summary: 'Listen to a customer service interaction about taking a flower order.',
    transcript: `Agent: Thank you for calling Martha's Flowers. How may I assist you?
Customer: Hello, I'd like to order flowers.
Agent: I'd be happy to take care of your order. May I have your name, please?
Customer: Randall Thomas.
Agent: Can you spell that for me?
Customer: Randall, R-A-N-D-A-L-L. Thomas, T-H-O-M-A-S.
Agent: Thank you. May I have your home or office number, area code first?
Customer: Area code 409, then 866-5088.
Agent: Do you have a fax number or email address?
Customer: My email is randall.thomas@gmail.com.
Agent: May I have your shipping address?
Customer: 60800 Gladys Avenue, Beaumont, Texas. Zip code 77706.
Agent: What products were you interested in purchasing?
Customer: Red roses, probably a dozen.
Agent: One dozen red roses. Do you want long stems?
Customer: Yes, sure.
Agent: Let me process the order. Randall, you're ordering one dozen long-stemmed red roses. The total amount is $40, and it will be shipped to your address within 24 hours.
Customer: How soon can you deliver my roses again?
Agent: Within 24 hours.
Customer: Okay, no problem.
Agent: Is there anything else I can help you with?
Customer: That's all for now. Thanks.
Agent: Thank you for calling Martha's Florist. Have a nice day.`,
    vocabulary: [
      { term: 'order', meaning: 'pedido', example: 'I would like to order flowers.' },
      { term: 'shipping address', meaning: 'dirección de envío', example: 'May I have your shipping address?' },
      { term: 'within 24 hours', meaning: 'dentro de 24 horas', example: 'It will be shipped within 24 hours.' },
    ],
    questions: [
      { id: 'listening-001-q1', type: 'main_idea', question: 'What is the main purpose of the call?', options: ['To take a flower order', 'To schedule a job interview', 'To cancel a delivery', 'To request technical support'], correctAnswer: 'To take a flower order', explanation: 'The customer calls to order one dozen red roses.' },
      { id: 'listening-001-q2', type: 'detail', question: 'What product does the customer order?', options: ['A birthday cake', 'One dozen long-stemmed red roses', 'A gift card', 'A plant basket'], correctAnswer: 'One dozen long-stemmed red roses', explanation: 'The agent confirms one dozen long-stemmed red roses.' },
      { id: 'listening-001-q3', type: 'detail', question: 'How much is the order?', options: ['$24', '$40', '$50', '$75'], correctAnswer: '$40', explanation: 'The agent says the total amount of the order is $40.' },
      { id: 'listening-001-q4', type: 'vocabulary_in_context', question: 'What does “shipping address” mean in this conversation?', options: ['The place where the order should be delivered', 'The customer’s email password', 'The store location', 'The payment method'], correctAnswer: 'The place where the order should be delivered', explanation: 'The agent asks for the address where the flowers will be shipped.' },
      { id: 'listening-001-q5', type: 'detail', question: 'When will the roses be delivered?', options: ['Within 24 hours', 'In one week', 'After two business days', 'The same minute'], correctAnswer: 'Within 24 hours', explanation: 'The agent repeats that the roses will be delivered within 24 hours.' },
    ],
  },
  {
    id: 'listening-002',
    slug: 'nissan-map-update-sales-call',
    title: 'Nissan Map Update Sales Call',
    level: 'B1',
    category: 'Sales',
    context: 'sales call',
    audioUrl: '/audio/listening/audio-2-sales-map-nissan-car.mp3',
    audioType: 'audio/mpeg',
    estimatedTime: '5 min',
    summary: 'Listen to a sales call about updating a vehicle map system.',
    transcript: `Agent: Thank you for calling Nissan. My name is Lauren. Can I have your name?
Customer: My name is John Smith.
Agent: Thank you, John. How can I help you?
Customer: I was calling to see how much it would cost to update the map in my car.
Agent: I'd be happy to help you with that today. Did you receive a mailer from us?
Customer: I did. Do you need the customer number?
Agent: Yes, please.
Customer: It's 15243.
Agent: Thank you. And the year, make, and model of your vehicle?
Customer: I have a 2009 Nissan Altima.
Agent: I found your profile. Can you verify your address and phone number, please?
Customer: It's 1255 North Research Way in Orem, Utah, 84097. My phone number is 801-4311.
Agent: The newest version available for your vehicle is version 7.7, released in March of 2012. The price of the new map is $99, plus shipping and tax.
Customer: I'm not sure if I can afford it right now.
Agent: You have not updated your vehicle for three years, so this is like getting three years of updates for the price of one. Also, the current promotion gives an extra $50 off before it expires.
Customer: That does sound pretty good.
Agent: If I set this order up now, it will ship out today for $50 less. Do you have your credit card handy?
Customer: Yes, let's use a Visa.`,
    vocabulary: [
      { term: 'map update', meaning: 'actualización de mapa', example: 'He wants to update the map in his car.' },
      { term: 'promotion', meaning: 'promoción', example: 'The promotion gives $50 off.' },
      { term: 'expires', meaning: 'vence', example: 'The offer expires soon.' },
    ],
    questions: [
      { id: 'listening-002-q1', type: 'main_idea', question: 'What does the customer ask about?', options: ['Updating the map in his car', 'Buying a new phone', 'Scheduling maintenance for tires', 'Changing his insurance policy'], correctAnswer: 'Updating the map in his car', explanation: 'The customer wants to know the cost to update the vehicle map.' },
      { id: 'listening-002-q2', type: 'detail', question: 'What vehicle does the customer have?', options: ['A 2009 Nissan Altima', 'A 2012 Nissan Sentra', 'A 2009 Toyota Corolla', 'A 2015 Nissan Rogue'], correctAnswer: 'A 2009 Nissan Altima', explanation: 'The customer says he has a 2009 Nissan Altima.' },
      { id: 'listening-002-q3', type: 'detail', question: 'What is the regular price of the new map before shipping and tax?', options: ['$50', '$75', '$99', '$152'], correctAnswer: '$99', explanation: 'The agent says the new map costs $99 plus shipping and tax.' },
      { id: 'listening-002-q4', type: 'purpose', question: 'Why does the agent mention the promotion?', options: ['To explain why buying today may be a good option', 'To cancel the customer’s profile', 'To avoid answering the price question', 'To change the customer’s address'], correctAnswer: 'To explain why buying today may be a good option', explanation: 'The agent explains the $50 discount before it expires.' },
      { id: 'listening-002-q5', type: 'inference', question: 'What can you infer at the end of the call?', options: ['The customer is ready to place the order', 'The customer wants to end the call immediately', 'The agent cannot find the profile', 'The map update is free'], correctAnswer: 'The customer is ready to place the order', explanation: 'The customer agrees to use a Visa after hearing the offer.' },
    ],
  },
  {
    id: 'listening-003',
    slug: 'vacuum-support-case',
    title: 'Vacuum Support Case',
    level: 'B1',
    category: 'Tech Support',
    context: 'troubleshooting',
    audioUrl: '/audio/listening/audio-3-vacuum-case.m4a',
    audioType: 'audio/mp4',
    estimatedTime: '5 min',
    summary: 'Listen to a support conversation about troubleshooting a vacuum cleaner.',
    transcript: `Agent: All Pro Vacuums. This is Tanya.
Customer: Hey, Tanya. I'm having a problem with my vacuum cleaner. It just stopped working and I don't know why.
Agent: Did you check underneath to see if anything is blocking it?
Customer: Yes, that was one of the first things I did. I started vacuuming my son's room and it worked fine. Then I moved into the living room, which is larger.
Agent: How about the belt? Did you check to see if it was broken?
Customer: It was not the belt. I checked that too. When I was vacuuming the living room, I noticed it was not picking up things very well, so I turned it off and looked at it. Nothing was clogged underneath, and the belt seemed okay.
Agent: Did the vacuum cleaner work when you first started using it today?
Customer: Yes. It worked in my son's room, and then it stopped working in the living room.
Agent: Have you checked the bag? They get full and you have to replace them.
Customer: Let me check the bag. I will stay on the phone. Okay, it is completely full.
Agent: It sounds like that fixed your problem.
Customer: Yes. Thank you.
Agent: No problem.`,
    vocabulary: [
      { term: 'blocking', meaning: 'bloqueando', example: 'Check if anything is blocking it.' },
      { term: 'belt', meaning: 'banda / correa', example: 'Did you check the belt?' },
      { term: 'replace', meaning: 'reemplazar', example: 'The bag gets full and you have to replace it.' },
    ],
    questions: [
      { id: 'listening-003-q1', type: 'main_idea', question: 'What problem does the customer report?', options: ['The vacuum cleaner stopped working well', 'The customer wants to buy flowers', 'The customer needs a map update', 'The customer wants to change a phone bill'], correctAnswer: 'The vacuum cleaner stopped working well', explanation: 'The customer explains that the vacuum stopped working properly.' },
      { id: 'listening-003-q2', type: 'detail', question: 'Where did the vacuum first work fine?', options: ['In the son’s room', 'In the garage', 'In the kitchen', 'In the office'], correctAnswer: 'In the son’s room', explanation: 'The customer says it worked fine while vacuuming the son’s room.' },
      { id: 'listening-003-q3', type: 'detail', question: 'What two things did the customer already check?', options: ['Underneath the vacuum and the belt', 'The price and the receipt', 'The account and password', 'The app and network'], correctAnswer: 'Underneath the vacuum and the belt', explanation: 'The customer checked for blockage underneath and checked the belt.' },
      { id: 'listening-003-q4', type: 'inference', question: 'What was probably causing the problem?', options: ['The vacuum bag was full', 'The belt was missing', 'The customer had no electricity', 'The agent sent the wrong part'], correctAnswer: 'The vacuum bag was full', explanation: 'After checking the bag, the customer says it is completely full and the problem is fixed.' },
      { id: 'listening-003-q5', type: 'vocabulary_in_context', question: 'What does “replace” mean in this call?', options: ['Put in a new one', 'Spell a name', 'Offer a discount', 'Schedule a meeting'], correctAnswer: 'Put in a new one', explanation: 'The agent explains that full bags need to be replaced.' },
    ],
  },
  {
    id: 'listening-004',
    slug: 'birthday-party-good-call',
    title: 'Birthday Party Good Call',
    level: 'B2',
    category: 'Customer Service',
    context: 'service quality',
    audioUrl: '/audio/listening/audio-4-bad-call-vs-good-call.mp3',
    audioType: 'audio/mpeg',
    estimatedTime: '8 min',
    summary: 'Listen to a training-style comparison of a service call and a better guided call.',
    transcript: `A caller asks a family fun center for birthday party information. In the first interaction, the employee gives limited answers and does not guide the caller clearly. The caller feels that it is difficult to get information.
In the improved call, Jordan thanks the caller, asks helpful questions, and uses the child’s name. Jordan explains two packages: a supreme package and a deluxe package. The supreme package includes a party host, a private party suite, plates, cups, napkins, a balloon bouquet, activities, invitations, gifts, pizza, unlimited soft drinks, and a game card. Jordan asks whether the caller prefers a weekday or weekend, Saturday or Sunday, and an early or later time.
The caller chooses the supreme package for Saturday at 11:30. Jordan explains that a $75 deposit is needed and that it goes toward the party. The caller says Jordan has been very helpful and decides to take care of the deposit by credit card. At the end, the caller says the second call was much better because it was personal, clear, and helpful.`,
    vocabulary: [
      { term: 'package', meaning: 'paquete', example: 'The supreme package includes food and game cards.' },
      { term: 'deposit', meaning: 'depósito / anticipo', example: 'A $75 deposit is needed to confirm the party.' },
      { term: 'options', meaning: 'opciones', example: 'The agent gives clear options.' },
    ],
    questions: [
      { id: 'listening-004-q1', type: 'main_idea', question: 'What is the main focus of the audio?', options: ['Comparing a weak service call with a better service call', 'Explaining a phone bill', 'Troubleshooting a device', 'Giving medical benefits information'], correctAnswer: 'Comparing a weak service call with a better service call', explanation: 'The audio contrasts a poor interaction with an improved guided call.' },
      { id: 'listening-004-q2', type: 'detail', question: 'What package does the caller choose in the improved call?', options: ['The supreme package', 'The basic repair package', 'The standard delivery option', 'The free trial'], correctAnswer: 'The supreme package', explanation: 'The caller says the child and friends would love the supreme package.' },
      { id: 'listening-004-q3', type: 'detail', question: 'What time does the caller choose for the party?', options: ['10:00', '11:30', '2:00', '8:00'], correctAnswer: '11:30', explanation: 'The caller chooses 11:30 after Jordan offers 10:00 or 11:30.' },
      { id: 'listening-004-q4', type: 'vocabulary_in_context', question: 'What does “deposit” mean in this call?', options: ['A payment used to confirm the party', 'A list of games', 'A birthday invitation', 'A customer complaint'], correctAnswer: 'A payment used to confirm the party', explanation: 'Jordan says a $75 deposit is needed to confirm the party and goes toward the total.' },
      { id: 'listening-004-q5', type: 'inference', question: 'Why does the caller prefer the improved call?', options: ['The agent gives clear information and personalizes the service', 'The agent refuses to answer questions', 'The package becomes completely free', 'The caller does not need a reservation'], correctAnswer: 'The agent gives clear information and personalizes the service', explanation: 'The caller mentions clear options, helpfulness, and use of the child’s name.' },
    ],
  },
  {
    id: 'listening-005',
    slug: 'att-bill-upgrade-fee',
    title: 'AT&T Bill Upgrade Fee',
    level: 'B1',
    category: 'Customer Service',
    context: 'billing support',
    audioUrl: '/audio/listening/audio-5-att-customer-service.mp3',
    audioType: 'audio/mpeg',
    estimatedTime: '6 min',
    summary: 'Listen to a wireless customer service call about explaining an upgrade fee.',
    transcript: `Agent: Thank you for calling AT&T about your wireless service. My name is Brittany Davis and I can help you. Who do I have the pleasure of speaking with?
Customer: This is Mrs. Clark. I was calling about my bill. There is a $40 fee on it and I wanted to know why.
Agent: I understand your concern regarding your bill. I will be happy to pull up your account and look at that charge with you today. May you verify the last four digits of your social?
Customer: One, two, three, four.
Agent: While I pull up the account, please log into your My AT&T app so we can review the charges together.
Customer: I understand.
Agent: Click View Bill and download the full PDF file. I see that the line ending in 4956 has the $40 upgrade fee. That is the number you upgraded.
Agent: AT&T allows customers to upgrade with a new two-year contract, and there is a one-time $40 upgrade fee. The fee helps continue offering discounts on equipment and supports the cost of activating the device on AT&T systems and towers.
Agent: Do you have any additional questions or concerns about the account, device, or other services?
Customer: No, I do not have additional questions.
Agent: While you are logged into the app, you can make payments, view bills, and set up payment arrangements.
Customer: This app is really nice.
Agent: Thank you for being a valued customer. Have a great day.`,
    vocabulary: [
      { term: 'upgrade fee', meaning: 'cargo por actualización / renovación de equipo', example: 'There is a $40 upgrade fee.' },
      { term: 'verify', meaning: 'verificar', example: 'May you verify the last four digits?' },
      { term: 'payment arrangements', meaning: 'arreglos de pago', example: 'You can set up payment arrangements in the app.' },
    ],
    questions: [
      { id: 'listening-005-q1', type: 'main_idea', question: 'Why does the customer call?', options: ['To ask about a $40 fee on her bill', 'To order flowers', 'To book a birthday party', 'To update a car map'], correctAnswer: 'To ask about a $40 fee on her bill', explanation: 'The customer wants to know why there is a $40 fee.' },
      { id: 'listening-005-q2', type: 'detail', question: 'What does the agent ask the customer to verify?', options: ['The last four digits of her social', 'Her favorite app', 'Her car model', 'Her delivery address'], correctAnswer: 'The last four digits of her social', explanation: 'The agent asks for the last four digits to access the account.' },
      { id: 'listening-005-q3', type: 'detail', question: 'Where does the agent ask the customer to review the bill?', options: ['In the My AT&T app', 'On a printed brochure', 'At a repair shop', 'Inside an email from HR'], correctAnswer: 'In the My AT&T app', explanation: 'The agent guides the customer through the My AT&T app.' },
      { id: 'listening-005-q4', type: 'purpose', question: 'Why does the agent explain the upgrade fee?', options: ['To help the customer understand the charge', 'To sell flowers', 'To cancel the customer’s account', 'To avoid verifying the account'], correctAnswer: 'To help the customer understand the charge', explanation: 'The agent explains that it is a one-time fee connected to the upgrade.' },
      { id: 'listening-005-q5', type: 'best_response', question: 'What is the best summary of the agent’s service?', options: ['The agent verifies the account, explains the fee, and points out app features', 'The agent refuses to help', 'The agent transfers the call immediately', 'The agent asks the customer to call Nissan'], correctAnswer: 'The agent verifies the account, explains the fee, and points out app features', explanation: 'The agent verifies, explains the charge, and mentions payments, bills, and payment arrangements in the app.' },
    ],
  },
]

export const listeningPracticeCategories = [...new Set(listeningPracticeItems.map((item) => item.category))]
export const listeningPracticeContexts = [...new Set(listeningPracticeItems.map((item) => item.context))]
