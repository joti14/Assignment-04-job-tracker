let interviewList = [];
let rejectedList = [];

const totalJobs = document.getElementById('total-job');
const interviewEl = document.getElementById('total-interview');
const rejectedEl = document.getElementById('total-rejected');

const allCards = document.getElementById('all-cards');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');

const mainContainer = document.getElementById('main-container');


function updateCounts(){
    totalJobs.innerText = allCards.children.length;

    interviewEl.innerText = interviewList.length;
    rejectedEl.innerText = rejectedList.length;
}

updateCounts()

function toggleStyle(id) {
    
    // remove btn-active from all filter buttons
    allFilterBtn.classList.remove('btn-active');
    interviewFilterBtn.classList.remove('btn-active');
    rejectedFilterBtn.classList.remove('btn-active');
    
    // adding btn-active only to the clicked button
    const selectedBtn = document.getElementById(id);
    selectedBtn.classList.add('btn-active');
}

allFilterBtn.addEventListener('click', function(){
    toggleStyle('all-filter-btn');
});
interviewFilterBtn.addEventListener('click', function(){
    toggleStyle('interview-filter-btn');
});
rejectedFilterBtn.addEventListener('click', function(){
    toggleStyle('rejected-filter-btn');
});


mainContainer.addEventListener('click', function(event) {
    if(event.target.classList.contains('interview-btn')){
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobInfo = parentNode.querySelector('.job-info').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        const statusElement = parentNode.querySelector('.job-status');
        const currentStatus = statusElement.innerText;
        
        if(currentStatus === 'INTERVIEW'){
            statusElement.innerText = 'NOT APPLIED';
            statusElement.className = 'job-status btn btn-primary btn-soft text-[#002C5C] mb-4';
            interviewList.className = interviewList.filter(item => item.companyName != companyName);
        } 
        else{
            statusElement.innerText = 'INTERVIEW';
            statusElement.className = 'job-status btn btn-outline btn-success mb-4';

            const cardInfo = {
                companyName,
                jobTitle,
                jobInfo,
                statusElement: 'INTERVIEW',
                jobDescription,
            };

            const jobExist = interviewList.find(item => item.companyName == cardInfo.companyName);
            
            if(!jobExist){
                interviewList.push(cardInfo);
            }
            
            rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);
        }  
        
        updateCounts();
    }
    
    
    else if(event.target.classList.contains('rejected-btn')){
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobInfo = parentNode.querySelector('.job-info').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        const statusElement = parentNode.querySelector('.job-status');
        const currentStatus = statusElement.innerText;
        
        if(currentStatus === 'REJECTED'){
            statusElement.innerText = 'NOT APPLIED';
            statusElement.className = 'job-status btn btn-primary btn-soft text-[#002C5C] mb-4';
            rejectedList = rejectedList.filter(item => item.companyName != companyName)
        } 
        else{
            statusElement.innerText = 'REJECTED';
            statusElement.className = 'job-status btn btn-outline btn-error mb-4';

            const cardInfo = {
                companyName,
                jobTitle,
                jobInfo,
                statusElement: 'REJECTED',
                jobDescription,
            };

            const jobExist = rejectedList.find(item => item.companyName == cardInfo.companyName);
            
            if(!jobExist){
                rejectedList.push(cardInfo);
            }
            
            interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);
        }  
        
        updateCounts();
    }
      
    
})