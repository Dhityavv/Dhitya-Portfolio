(function(){
  'use strict';

  var dialog = document.querySelector('.project-dialog');
  var title = dialog.querySelector('#dialog-title');
  var meta = dialog.querySelector('.dialog-meta');
  var description = dialog.querySelector('.dialog-description');
  var role = dialog.querySelector('.dialog-role');
  var sourceLink = dialog.querySelector('.dialog-source');
  var sourceUnavailable = dialog.querySelector('.dialog-source-unavailable');
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
  var filterOptions = Array.prototype.slice.call(document.querySelectorAll('.filter-option'));
  var projectTotal = document.querySelector('[data-project-total]');
  var filterResult = document.querySelector('.filter-result');

  function normalizedCategory(project){
    return project.dataset.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function matchesFilter(project, filter){
    return filter === 'all' ||
      (filter === 'upcoming' && project.dataset.status === 'upcoming') ||
      normalizedCategory(project) === filter;
  }

  function updateFilter(filter){
    var visibleCount = 0;
    filterOptions.forEach(function(option){
      var isActive = option.dataset.filter === filter;
      option.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    galleryProjects.concat(listProjects).forEach(function(project){
      var isVisible = matchesFilter(project, filter);
      project.hidden = !isVisible;
      if(project.classList.contains('gallery-card') && isVisible) visibleCount++;
    });

    filterResult.textContent = 'Showing ' + visibleCount + (visibleCount === 1 ? ' project' : ' projects');
  }

  filterOptions.forEach(function(option){
    option.addEventListener('click', function(){
      updateFilter(option.dataset.filter);
    });
  });

  projectTotal.textContent = String(projectCount).padStart(2, '0');
  document.querySelectorAll('[data-filter-count]').forEach(function(count){
    var filter = count.dataset.filterCount;
    count.textContent = String(galleryProjects.filter(function(project){
      return matchesFilter(project, filter);
    }).length).padStart(2, '0');
  });

  galleryProjects.concat(listProjects).forEach(function(project){
    project.addEventListener('click', function(){
      activeProject = project;
      title.textContent = project.dataset.title;
      meta.textContent = project.dataset.category + ' · ' + project.dataset.year + ' · ' + project.dataset.status;
      description.textContent = project.dataset.description;
      role.textContent = project.dataset.role;
      var source = project.dataset.source.trim();
      if(source){
        var sourceUrl = new URL(source, window.location.href);
        if(sourceUrl.protocol !== 'http:' && sourceUrl.protocol !== 'https:'){
          throw new Error('Project source URLs must use HTTP or HTTPS.');
        }
        sourceLink.href = sourceUrl.href;
        sourceLink.hidden = false;
        sourceUnavailable.hidden = true;
      }else{
        sourceLink.removeAttribute('href');
        sourceLink.hidden = true;
        sourceUnavailable.hidden = false;
      }
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
