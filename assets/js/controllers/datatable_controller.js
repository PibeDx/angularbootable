function datatableController($scope) {
	$scope.currentPage = 1;
  	$scope.pageSize = 5;
	/* Validaciones por expresiones regulares */
	$scope.regex = {
		money: /^[0-9]+([,.][0-9]+)?$/,
		int: /^[-+]?\d+$/,
		string_ws: /^[a-zA-Z\s]*$/
	};
	/* Variables de búsqueda */
	$scope.categorySelec = {};
	$scope.stateSelec = {};
	$scope.newCourse = {};
	/* simula una bbdd */
	$scope.courses = [
		{
			id: 1,
			nombre: 'Administración y Gestión pública',
			creditos: 24,
			duracion: 4,
			horas: 240,
			categoria: 1,
			matricula: 100.00,
			modulo: 80.00,
			certificado: 80.00,
			estado: 1
		},
		{
			id: 2,
			nombre: 'Gestión y dirección de recourses humanos',
			creditos: 24,
			duracion: 4,
			horas: 240,
			categoria: 1,
			matricula: 100.00,
			modulo: 80.00,
			certificado: 80.00,
			estado: 1
		},
		{
			id: 3,
			nombre: 'Contrataciones y adquisiciones con el estado',
			creditos: 18,
			duracion: 3,
			horas: 210,
			categoria: 1,
			matricula: 100.00,
			modulo: 80.00,
			certificado: 80.00,
			estado: 1
		},
		{
			id: 4,
			nombre: 'Derecho procesal penal',
			creditos: 24,
			duracion: 4,
			horas: 240,
			categoria: 2,
			matricula: 100.00,
			modulo: 80.00,
			certificado: 80.00,
			estado: 1
		},
		{
			id: 5,
			nombre: 'Aplicación del nuevo código procesal penal',
			creditos: 35,
			duracion: 6,
			horas: 320,
			categoria: 2,
			matricula: 100.00,
			modulo: 80.00,
			certificado: 80.00,
			estado: 2
		},
		{
			id: 6,
			nombre: 'Derecho tributario',
			creditos: 24,
			duracion: 6,
			horas: 240,
			categoria: 1,
			matricula: 100.00,
			modulo: 80.00,
			certificado: 80.00,
			estado: 1
		}
	];
	$scope.categories = [
		{
			id: 1, nombre: 'Administración y Gerencia'
		},
		{
			id: 2, nombre: 'Derecho y ciencias políticas'
		}
	];
	$scope.states = [
		{
			id: 1, nombre: 'Activo',
		},
		{
			id: 2, nombre: 'Inactivo'
		}
	];

	sessionStorage.setItem('courses', JSON.stringify($scope.courses));
	/* SIMULA CRUDS */
	$scope.applyFilters = function() {
		var courses = JSON.parse(sessionStorage.getItem("courses"));
		// solo busca por estado
		if($scope.categorySelec === null || !$scope.categorySelec.id) {
			var matches = [];
			console.log('Búsqueda por estado...');
			for(var key in courses) {
				var current = courses[key];
				if(current.estado === $scope.stateSelec.id)
					matches.push(current);
			}
			$scope.courses = matches;
		}
		// busca por categoría y estado
		else {
			var matches = [];
			for(var key in courses) {
				var current = courses[key];
				if(current.estado === $scope.stateSelec.id
					&& current.categoria === $scope.categorySelec.id)
					matches.push(current);
			}
			$scope.courses = matches;
		}
	}

	$scope.createCourse = function() {
		console.log($scope.newCourse);
		$scope.courses.push($scope.newCourse);
		$scope.newCourse = {};
		$('#newCourseModal').modal('hide');
	}

	function makeBackup() {
		$scope.coursesbak = [];
		for(var key in $scope.courses) {
			$scope.coursesbak.push($scope.courses[key]);
		}
	}

	function restore() {
		$scope.courses = [];
		for(var key in $scope.coursesbak) {
			$scope.courses.push($scope.coursesbak[key]);
		}
	}

	function defaultFilters() {
		$scope.stateSelec = $scope.states[0]; // activo
	}

	// por defecto muestra los cursos de todas las categorías y el estado 'Activo'
	defaultFilters();
	makeBackup(); // hace un backup de los courses al inicio
}
