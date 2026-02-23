const totalJobs = document.getElementById('total-job');
const intervewCount = document.getElementById('total-interview');
const rejectedCount = document.getElementById('total-rejected');

const allCardsSection = document.getElementById('all-cards');

function calculateCount(){
    totalJobs.innerText = allCardsSection.children.length;
}

calculateCount()