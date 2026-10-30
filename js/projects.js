(function(){
  'use strict';

  var dialog = document.querySelector('.project-dialog');
  var title = dialog.querySelector('#dialog-title');
  var meta = dialog.querySelector('.dialog-meta');
  var description = dialog.querySelector('.dialog-description');
  var role = dialog.querySelector('.dialog-role');
  var image = dialog.querySelector('.dialog-image');
  var imagePlaceholder = dialog.querySelector('.dialog-art-placeholder');
  var index = dialog.querySelector('.dialog-art-index');
  var closeButton = dialog.querySelector('.dialog-close');
  var activeProject = null;
  var pageScrollY = 0;
  var previousHtmlOverflow = '';
  var previousBodyOverflow = '';
  var galleryProjects = Array.prototype.slice.call(document.querySelectorAll('.gallery-card'));
  var listProjects = Array.prototype.slice.call(document.querySelectorAll('.project-row'));
  var projectCount = galleryProjects.length;

  galleryProjects.concat(listProjects).forEach(function(project){
    project.addEventListener('click', function(){
      activeProject = project;
      title.textContent = project.dataset.title;
      meta.textContent = project.dataset.category + ' · ' + project.dataset.year;
      description.textContent = project.dataset.description;
      role.textContent = project.dataset.role;
      var projectIndex = project.classList.contains('gallery-card')
        ? galleryProjects.indexOf(project)
        : listProjects.indexOf(project);
      index.textContent = String(projectIndex + 1).padStart(2, '0') +
        ' / ' + String(projectCount).padStart(2, '0');

      if(project.dataset.image){
        image.src = project.dataset.image;
        image.alt = project.dataset.title + ' artwork';
        image.hidden = false;
        imagePlaceholder.hidden = true;
      }else{
        image.removeAttribute('src');
        image.alt = '';
        image.hidden = true;
        imagePlaceholder.hidden = false;
      }

      pageScrollY = window.scrollY;
      previousHtmlOverflow = document.documentElement.style.overflow;
      previousBodyOverflow = document.body.style.overflow;
      document.documentElement.classList.add('project-dialog-open');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', function(){
    dialog.close();
  });

  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape' && dialog.open){
      event.preventDefault();
      dialog.close();
    }
  });

  dialog.addEventListener('close', function(){
    document.documentElement.classList.remove('project-dialog-open');
    document.documentElement.style.overflow = previousHtmlOverflow;
    document.body.style.overflow = previousBodyOverflow;
    window.scrollTo(0, pageScrollY);
    if(activeProject) activeProject.focus();
  });

  dialog.addEventListener('click', function(event){
    if(event.target === dialog) dialog.close();
  });

  document.querySelectorAll('.view-option').forEach(function(option){
    option.addEventListener('click', function(){
      var view = option.dataset.view;
      document.body.dataset.view = view;
      document.querySelectorAll('.view-option').forEach(function(item){
        item.setAttribute('aria-pressed', item === option ? 'true' : 'false');
      });
    });
  });
})();
