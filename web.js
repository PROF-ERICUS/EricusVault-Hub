const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const answer = button.nextElementSibling;

    // Toggle active state
    faqItem.classList.toggle('active');

    // Collapse other open answers
    document.querySelectorAll('.faq-item').forEach(item => {
      if(item !== faqItem) {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = null;
      }
    });

    // Toggle current answer
    if(answer.style.maxHeight){
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
