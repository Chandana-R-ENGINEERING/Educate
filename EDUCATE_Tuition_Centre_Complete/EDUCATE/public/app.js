const grade = document.querySelector('#grade');
const board = document.querySelector('#board');
const message = document.querySelector('#message');
const statusText = document.querySelector('#status');
function prepareEnquiry() {
  message.value = 'Namaskara, I would like to enquire about Class ' + grade.value + ' tuition for the ' + board.value + ' syllabus. Could you share the subjects offered, batch timings, fees and current availability?';
  statusText.textContent = '';
}
document.querySelectorAll('[data-grade]').forEach(link => link.addEventListener('click', () => {
  grade.value = link.dataset.grade;
  prepareEnquiry();
}));
grade.addEventListener('change', prepareEnquiry);
board.addEventListener('change', prepareEnquiry);
document.querySelector('#copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(message.value);
    statusText.textContent = 'Enquiry copied. Paste it into your message.';
  } catch {
    message.focus();
    message.select();
    statusText.textContent = 'Your enquiry is selected. Use your device’s Copy command.';
  }
});
prepareEnquiry();
const callForm=document.querySelector('#callform');
let bookingId;
callForm.addEventListener('input',()=>{bookingId=null;document.querySelector('#callstatus').textContent='';});
document.querySelectorAll('[data-grade]').forEach(link=>link.addEventListener('click',()=>{callForm.elements.grade.value=link.dataset.grade;bookingId=null;}));
callForm.addEventListener('submit',async event=>{
 event.preventDefault();
 const button=callForm.querySelector('button');
 if(button.disabled)return;
 const status=document.querySelector('#callstatus');
 const data=Object.fromEntries(new FormData(callForm));
 bookingId ||= crypto.randomUUID();
 const fieldset=Array.from(callForm.elements);
 fieldset.forEach(el=>el.disabled=true);
 status.textContent='Saving…';
 try{
  const response=await fetch('/api/callbacks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,id:bookingId})});
  if(!response.ok)throw Error();
  status.textContent='Demo callback saved. Reference '+bookingId.slice(0,8).toUpperCase()+'.';
  callForm.reset();bookingId=null;
 }catch{status.textContent='Could not save your callback. Check your details and try again.';}
 finally{fieldset.forEach(el=>el.disabled=false);}
});
