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
    if(event.target.classList.contains('interview-btn')){
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobInfo = parentNode.querySelector('.job-info').innerText;
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

        if(currentStatus == 'interview-filter-btn'){
            renderInterview();
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

        if(currentStatus == 'rejected-filter-btn'){
            renderRejected();
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
        div.className = 'bg-base-200 shadow flex justify-between p-10';
        div.innerHTML = `
            <!-- left part -->
                <div class="">
                    <h2 class="company-name text-2xl font-medium text-[#002C5C]">${interview.companyName}</h2>
                    <p class="job-title text-[#64748B] text-lg font-medium mb-5">${interview.jobTitle}</p>
                    <p class="job-info text-[#64748B] text-md mb-5">${interview.jobInfo}</p>
                    <button class="job-status btn btn-primary btn-soft text-[#002C5C] mb-4">${interview.statusElement}</button>
                    <p class="job-description text-[#323B49] mb-3">${interview.jobDescription}</p>
                    <div class="flex gap-3">
                        <button class="btn btn-outline btn-success interview-btn" >INTERVIEW</button>
                        <button class="btn btn-outline btn-error rejected-btn" >REJECTED</button>
                    </div>
                </div>
                <!-- right part -->
                <div>
                    <button class="btn btn-circle btn-sm"><i class="fa-solid fa-trash-can"></i>
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
        div.className = 'bg-base-200 shadow flex justify-between p-10';
        div.innerHTML = `
            <!-- left part -->
                <div class="">
                    <h2 class="company-name text-2xl font-medium text-[#002C5C]">${rejected.companyName}</h2>
                    <p class="job-title text-[#64748B] text-lg font-medium mb-5">${rejected.jobTitle}</p>
                    <p class="job-info text-[#64748B] text-md mb-5">${rejected.jobInfo}</p>
                    <button class="job-status btn btn-primary btn-soft text-[#002C5C] mb-4">${rejected.statusElement}</button>
                    <p class="job-description text-[#323B49] mb-3">${rejected.jobDescription}</p>
                    <div class="flex gap-3">
                        <button class="btn btn-outline btn-success interview-btn" >INTERVIEW</button>
                        <button class="btn btn-outline btn-error rejected-btn" >REJECTED</button>
                    </div>
                </div>
                <!-- right part -->
                <div>
                    <button class="btn btn-circle btn-sm"><i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
        `
        filteredSection.appendChild(div);
    }
}