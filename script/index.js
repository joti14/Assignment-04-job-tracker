const totalJobs = document.getElementById('total-job');
const intervewCount = document.getElementById('total-interview');
const rejectedCount = document.getElementById('total-rejected');

const allCardsSection = document.getElementById('all-cards');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

function calculateCount(){
    totalJobs.innerText = allCardsSection.children.length;
}

calculateCount()

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