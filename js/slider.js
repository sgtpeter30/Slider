let test
let test1
class MySlider {
  slideWidth;
  sliderMain
  timer
  stopTimer

  init(props){
    
    const sliderWrapper = props.mainElement;
    this.sliderMain = sliderWrapper;
    let slides = Array.from(sliderWrapper.children);
    

    console.log(sliderWrapper.children)
    console.log('slides: '+slides.length)
    console.log('etap1')
    sliderWrapper.classList.add('mySlider_wrapper');
    const maxSliderWidth = sliderWrapper.clientWidth;
    
    // nadanie szerokości slidera
    sliderWrapper.style.width = maxSliderWidth+'px';
    
    // stworzenie diva do przewijania
    let slidesList = document.createElement('div');
    slidesList.classList.add('mySlider_list');
    
    console.log('etap2')
    // zapoczątkowanie określenia wysokości slidera
    // let maxHeightSlide = 0;
    const maxSlideWidth = maxSliderWidth / props.slidesToShow;
    this.slideWidth = maxSlideWidth;
    let slideIndex = 0;
    for (let slide of slides) {
      slide.classList.add('mySlider_slide');
      slide.style.width = maxSlideWidth+'px';
      slide.setAttribute('slide', slideIndex);
      // create max height of slides
      // slide.clientHeight > maxHeightSlide ? maxHeightSlide = slide.clientHeight : maxHeightSlide;
      slidesList.append(slide);
      slideIndex++;
    }
    slides[0].classList.add('active');

    sliderWrapper.append(slidesList);
    
    console.log('etap4')
    // assign max height to wrapper
    // sliderWrapper.style.height = maxHeightSlide+'px';
    if(props.autoscroll !== false){
      props.autoscroll === null ? this.timer = "3000" : this.timer = props.autoscroll;
      this.autoScroll(this.timer);
    }
  };

  scrollSlides(directrion){
    console.log("przesuwam")
    let list = this.sliderMain.querySelector('.mySlider_list');
    console.log(list)
    console.log(list.querySelector('.active'))
    let activeSlide = list.querySelector('.active');
    // activeSlide.getAttribute('slide');
    let currentSlide = parseInt(activeSlide.getAttribute('slide'));
    let valueScroll
    test = activeSlide;
    if(directrion === 'left'){
      console.log("lewo")
      valueScroll = (currentSlide * this.slideWidth * -1) + this.slideWidth;
      // valueScroll = (currentSlide * this.slideWidth);
      console.log(valueScroll)
      
      if(activeSlide.previousElementSibling === null){
        alert('Koniec slajdów')
      }else{
        activeSlide.classList.remove('active');
        activeSlide.previousElementSibling.classList.add('active');
        list.style.transform = `translate(${valueScroll}px)`;
      }

    }else{
      console.log("prawo")
      valueScroll = (currentSlide * this.slideWidth * -1) - this.slideWidth;

      if(activeSlide.nextElementSibling === null){
        console.log("koniec")
        alert('Koniec slajdów')
        this.stopTimer = false;
      }else{
        activeSlide.classList.remove('active');
        activeSlide.nextElementSibling.classList.add('active');
        list.style.transform = `translate(${valueScroll}px)`;
      }
    }

  }
  autoScroll(timer){
    setTimeout(()=>{
      this.scrollSlides('right');
      if(this.stopTimer != false){
        this.autoScroll(timer);
      }
    },timer)
  }
}


const mySlider = new MySlider();
let sliderWrapper = document.querySelector('.images_wrapper');
sliderConfig = {
  mainElement: sliderWrapper,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoscroll: 1000,
  maxHeight: 'parrent',
  mobile:{
    slidesToShow: 1,
    slidesToScroll: 1,
  }
}
mySlider.init(sliderConfig);

