let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

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

const filteredSection = document.getElementById('filtered-jobs');

const emptyMsg = document.getElementById('empty-msg');

const filteredJobsCount = document.getElementById('filtered-jobs-count');


function updateCounts(){
    totalJobs.innerText = allCards.children.length;
    interviewEl.innerText = interviewList.length;
    rejectedEl.innerText = rejectedList.length;

    // Update filtered jobs count based on current view
    if(currentStatus === 'all-filter-btn') {
        filteredJobsCount.innerText = `${allCards.children.length} jobs`;
    }
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

    currentStatus = id;

    if(id === 'all-filter-btn') {
        allCards.classList.remove('hidden');
        filteredSection.classList.add('hidden');
        updateCounts();
    }
    else {
        allCards.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        
    
        if(id === 'interview-filter-btn') {
            renderInterview()
        }
        else if(id === 'rejected-filter-btn'){
            renderRejected();
        }
    }
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
    
     // handle delete button
    const deleteButton = event.target.closest('.delete-btn');
    
    if(deleteButton){
        const card = deleteButton.closest('.job-card');
        
        if(card) {
            const companyName = card.querySelector('.company-name').innerText;
            
            // Remove from arrays
            interviewList = interviewList.filter(item => item.companyName !== companyName);
            rejectedList = rejectedList.filter(item => item.companyName !== companyName);
            
            for(let jobCard of allCards.children) {
                const cardCompanyName = jobCard.querySelector('.company-name').innerText;
                if(cardCompanyName === companyName) {
                    jobCard.remove();
                    break; 
                }
            }
            
            updateCounts();
            
            if(currentStatus === 'interview-filter-btn') {
                renderInterview();
            } else if(currentStatus === 'rejected-filter-btn') {
                renderRejected();
            }
        }
        
        return;
    }

    


    if(event.target.classList.contains('interview-btn')){
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobLocation = parentNode.querySelector('.job-location').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const jobSalary = parentNode.querySelector('.job-salary').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        const statusElement = parentNode.querySelector('.job-status');
        const statusClicked = statusElement.innerText;

        if(statusClicked === 'INTERVIEW'){
            statusElement.innerText = 'NOT APPLIED';
            statusElement.className = 'job-status btn btn-primary btn-soft text-[#002C5C] mb-4';
            interviewList = interviewList.filter(item => item.companyName !== companyName);
        } 
        else{
            statusElement.innerText = 'INTERVIEW';
            statusElement.className = 'job-status btn btn-outline btn-success mb-4';

            const cardInfo = {
                companyName,
                jobTitle,
                jobLocation,
                jobType,
                jobSalary,
                statusElement: 'INTERVIEW',
                jobDescription,
            };

            const jobExist = interviewList.find(item => item.companyName == cardInfo.companyName);
            
            if(!jobExist){
                interviewList.push(cardInfo);
            }
            
            rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);
        }  

        for(let jobCard of allCards.children) {
            const cardCompanyName = jobCard.querySelector('.company-name').innerText;
            if(cardCompanyName === companyName) {
                const allCardsStatusElement = jobCard.querySelector('.job-status');

                if(statusClicked === 'INTERVIEW') {
                    allCardsStatusElement.innerText = 'NOT APPLIED';
                    allCardsStatusElement.className = 'job-status btn btn-primary btn-soft text-[#002C5C] mb-4';
                } else {
                    allCardsStatusElement.innerText = 'INTERVIEW';
                    allCardsStatusElement.className = 'job-status btn btn-outline btn-success mb-4';
                }
                break;
            }
        }

        if(currentStatus == 'interview-filter-btn'){
            renderInterview();
        } else if(currentStatus == 'rejected-filter-btn'){
            renderRejected();
        }
        
        updateCounts();
    }
    
    
    else if(event.target.classList.contains('rejected-btn')){
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobLocation = parentNode.querySelector('.job-location').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const jobSalary = parentNode.querySelector('.job-salary').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        const statusElement = parentNode.querySelector('.job-status');
        const statusClicked = statusElement.innerText;
        
        if(statusClicked === 'REJECTED'){
            statusElement.innerText = 'NOT APPLIED';
            statusElement.className = 'job-status btn btn-primary btn-soft text-[#002C5C] mb-4';
            rejectedList = rejectedList.filter(item => item.companyName !== companyName);
        } 
        else{
            statusElement.innerText = 'REJECTED';
            statusElement.className = 'job-status btn btn-outline btn-error mb-4';

            const cardInfo = {
                companyName,
                jobTitle,
                jobLocation,
                jobType,
                jobSalary,
                statusElement: 'REJECTED',
                jobDescription,
            };

            const jobExist = rejectedList.find(item => item.companyName == cardInfo.companyName);
            
            if(!jobExist){
                rejectedList.push(cardInfo);
            }
            
            interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);
        }  

        for(let jobCard of allCards.children) {
            const cardCompanyName = jobCard.querySelector('.company-name').innerText;
            if(cardCompanyName === companyName) {
                const allCardsStatusElement = jobCard.querySelector('.job-status');

                if(statusClicked === 'REJECTED') {
                    allCardsStatusElement.innerText = 'NOT APPLIED';
                    allCardsStatusElement.className = 'job-status btn btn-primary btn-soft text-[#002C5C] mb-4';
                } else {
                    allCardsStatusElement.innerText = 'REJECTED';
                    allCardsStatusElement.className = 'job-status btn btn-outline btn-error mb-4';
                }
                break;
            }
        }

        if(currentStatus == 'rejected-filter-btn'){
            renderRejected();
        } else if(currentStatus == 'interview-filter-btn'){
            renderInterview();
        }
        
        updateCounts();
    }
      
    
})


function renderInterview() {
    filteredSection.innerHTML = '';

    if(interviewList.length === 0){
        emptyMsg.classList.remove('hidden');
        filteredSection.appendChild(emptyMsg);
        return;
    }

    emptyMsg.classList.add('hidden');

    filteredJobsCount.innerText = `${interviewList.length} of ${allCards.children.length} jobs`;

    for(let interview of interviewList) {
        let div = document.createElement('div');
        div.className = 'job-card bg-base-200 shadow flex justify-between p-10';
        div.innerHTML = `
            <!-- left part -->
                <div class="">
                    <h2 class="company-name text-2xl font-medium text-[#002C5C]">${interview.companyName}</h2>
                    <p class="job-title text-[#64748B] text-lg font-medium mb-5">${interview.jobTitle}</p>
                    <p class="text-[#64748B] text-md mb-5"><span class="job-location">${interview.jobLocation}</span> <span class="job-type">${interview.jobType}</span> <span class="job-salary">${interview.jobSalary}</span></p>
                    <button class="job-status btn btn-outline btn-success mb-4">${interview.statusElement}</button>
                    <p class="job-description text-[#323B49] mb-3">${interview.jobDescription}</p>
                    <div class="flex gap-3">
                        <button class="btn btn-outline btn-success interview-btn" >INTERVIEW</button>
                        <button class="btn btn-outline btn-error rejected-btn" >REJECTED</button>
                    </div>
                </div>
                <!-- right part -->
                <div>
                    <button class="delete-btn btn btn-circle btn-sm"><i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
        `
        filteredSection.appendChild(div);
    }
}

function renderRejected() {
    filteredSection.innerHTML = '';

    if(rejectedList.length === 0){
        emptyMsg.classList.remove('hidden');
        filteredSection.appendChild(emptyMsg);
        return;
    }

    emptyMsg.classList.add('hidden');

    filteredJobsCount.innerText = `${rejectedList.length} of ${allCards.children.length} jobs`;
    

    for(let rejected of rejectedList) {
        let div = document.createElement('div');
        div.className = 'job-card bg-base-200 shadow flex justify-between p-10';
        div.innerHTML = `
            <!-- left part -->
                <div class="">
                    <h2 class="company-name text-2xl font-medium text-[#002C5C]">${rejected.companyName}</h2>
                    <p class="job-title text-[#64748B] text-lg font-medium mb-5">${rejected.jobTitle}</p>
                    <p class="text-[#64748B] text-md mb-5"><span class="job-location">${rejected.jobLocation}</span> <span class="job-type">${rejected.jobType}</span> <span class="job-salary">${rejected.jobSalary}</span></p>
                    <button class="job-status btn btn-outline btn-error mb-4">${rejected.statusElement}</button>
                    <p class="job-description text-[#323B49] mb-3">${rejected.jobDescription}</p>
                    <div class="flex gap-3">
                        <button class="btn btn-outline btn-success interview-btn" >INTERVIEW</button>
                        <button class="btn btn-outline btn-error rejected-btn" >REJECTED</button>
                    </div>
                </div>
                <!-- right part -->
                <div>
                    <button class="delete-btn btn btn-circle btn-sm"><i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
        `
        filteredSection.appendChild(div);
    }
}